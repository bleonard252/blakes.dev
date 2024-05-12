import { BridgeSupportedPlatform } from "../components/bridges/wizard-card.js";
import { BridgesFromUser } from "./base";
import { ActivityPubAddress } from "./convert-activitypub.js";
import { ATProtoHandle } from "./convert-atproto.js";
import { MatrixAddress } from "./convert-matrix.js";
import { NostrAddress } from "./convert-nostr.js";
import { XMPPAddress } from "./convert-xmpp.js";

interface ConversionOptions {
  from: BridgeSupportedPlatform;
  to: BridgeSupportedPlatform;
  /** The address given to convert. */
  originalAddress: string;
  /** A filtered list of applicable bridges. */
  bridges: Record<string, any>[];
  /** Gracefully set the errors to display; best paired with `return`. */
  setErrors: (errors: string[]) => void;
  /** With `to: "matrix"`, which kind of Matrix entity is expected. */
  matrixType?: 'user' | 'room';
}
interface ConversionResult {
  /** The converted address. */
  address: string;
  /** The bridge used to convert the address. */
  bridge: Record<string, any>;
  /** Whether there are any alternative bridges that could have been chosen. */
  alternativesAvailable: boolean;
}

export default async function runConversion({ from, to, originalAddress, bridges, setErrors, matrixType }: ConversionOptions): Promise<ConversionResult> {
  var fromAddr: Partial<BridgesFromUser>;
  if (from == 'activitypub') {
    fromAddr = ActivityPubAddress.fromString(originalAddress);
  } else if (from == 'nostr') {
    fromAddr = NostrAddress.fromString(originalAddress);
  } else if (from == 'atproto') {
    fromAddr = ATProtoHandle.fromString(originalAddress);
  } else if (from == 'matrix') {
    fromAddr = MatrixAddress.fromString(originalAddress);
  } else if (from == 'xmpp') {
    fromAddr = XMPPAddress.fromString(originalAddress);
  } else {
    setErrors(['Invalid source platform.']);
    return;
  }
  /** Which template substitutions are supported.
   * This is used to filter out bridges that require a template substitution that isn't supported.
   */
  function setSupportedBridges(): [string[], typeof bridges[0][]] {
    var supportedTemplates = [];
    if (Object.keys(fromAddr).includes("toString")) supportedTemplates.push("FROM");
    if (Object.keys(fromAddr).includes("domain") && fromAddr.domain) supportedTemplates.push("FROM_DOMAIN");
    if (Object.keys(fromAddr).includes("username") && fromAddr.username) supportedTemplates.push("FROM_USER");
    //if (Object.keys(fromAddr).includes("xmpp_resource")) supportedTemplates.push("FROM_RESOURCE");
    if (Object.keys(fromAddr).includes("pubkey") && fromAddr.pubkey) supportedTemplates.push("FROM_PUBKEY");
    const supportedBridges = bridges.filter((bridge) => {
      if (bridge.from != from) return false;
      if (bridge.to != to) return false;
      if (bridge.disabled) return false;
      if (from == 'matrix' && bridge['matrix:type'] != (fromAddr as MatrixAddress).matrix_type) return false;
      if (to == 'matrix' && bridge['matrix:type'] != matrixType) return false;

      // Check if the bridge supports the template substitutions we need
      if (!supportedTemplates.includes("FROM") && bridge.template.includes("{FROM}")) return false;
      if (!supportedTemplates.includes("FROM_DOMAIN") && bridge.template.includes("{FROM_DOMAIN}")) return false;
      if (!supportedTemplates.includes("FROM_USER") && bridge.template.includes("{FROM_USER}")) return false;
      //if (!supportedTemplates.includes("FROM_RESOURCE") && bridge.template.includes("{FROM_RESOURCE}")) return false;
      if (!supportedTemplates.includes("FROM_PUBKEY") && bridge.template.includes("{FROM_PUBKEY}")) return false;
      return true;
    });
    return [supportedTemplates, supportedBridges];
  };
  var [_, supportedBridges] = setSupportedBridges();
  if (supportedBridges.length == 0) {
    if (from == 'nostr' && originalAddress.includes("@")) {
      // if you need a pubkey but didn't provide one, try looking up the pubkey
      const res = await fetch(`https://${fromAddr.domain}/.well-known/nostr.json?user=${encodeURIComponent(fromAddr.username)}`).catch((e) => {
        return { status: 1, statusText: e.toString() } as Partial<Response>;
      });
      if (res.status == 200) {
        try {
          var data = await res.json();
        } catch (e) {
          setErrors([`${fromAddr.domain} doesn't support NIP-05. Try using a public key instead of an NIP-05 ID.`]);
          return;
        }
        if (data.names[fromAddr.username]) {
          fromAddr = NostrAddress.fromString(data.names[fromAddr.username]);
          [_, supportedBridges] = setSupportedBridges();
          if (supportedBridges.length == 0) {
            setErrors(['How did we get here? Try using a public key instead of an NIP-05 ID.']);
            return;
          }
        } else {
          setErrors([`User "${fromAddr.username}@${fromAddr.domain}" not found. Try using a public key instead of an NIP-05 ID.`]);
          return;
        }
      } else {
        setErrors(['User not found. Try using a public key instead of an NIP-05 ID.', `Error ${res.status} when looking up user: ${res.statusText}`]);
        return;
      }
    } else {
      setErrors(['No compatible bridges found. Try a different version of the ID.']);
      return;
    }
  }
  var index = 0, alternativesAvailable = false;
  if (supportedBridges.length > 1) {
    // this is to show the user they can refresh to get a different bridge, if the one they tried doesn't work.
    alternativesAvailable = true;
    // select a random supported bridge
    index = Math.floor(Math.random()*supportedBridges.length);
  }
  var bridge = supportedBridges[index];
  var template = bridge.template;

  // Apply transformations
  const substitutionTransformNames =  ["from",              "from_domain",   "from_user",       "from_pubkey"  ];
  var substitutions =                 [fromAddr.toString(), fromAddr.domain, fromAddr.username, fromAddr.pubkey];
  substitutions = substitutions.map((sub, i) => {
    const transformation = bridge['transform'+substitutionTransformNames[i]];
    if (typeof transformation !== 'string') return sub;
    if (transformation == 'lowercase') return sub.toLowerCase();
    if (transformation == 'uppercase') return sub.toUpperCase();
    // Technically the below shouldn't even be needed, since XEP-0106 says the CLIENTS are supposed to escape JIDs.
    if (transformation == 'jid-escape') return XMPPAddress.escapeString(sub);
    if (transformation == 'jid-unescape') return XMPPAddress.unescapeString(sub);
    return sub;
  });
  const [subFrom, subFromDomain, subFromUser, subFromPubkey] = substitutions;

  // Apply template substitutions
  if (template.includes("{FROM}")) template = template.replace("{FROM}", subFrom);
  if (template.includes("{FROM_DOMAIN}")) template = template.replace("{FROM_DOMAIN}", subFromDomain);
  if (template.includes("{FROM_USER}")) template = template.replace("{FROM_USER}", subFromUser);
  //if (template.includes("{FROM_RESOURCE}")) template = template.replace("{FROM_RESOURCE}", fromAddr.xmpp_resource);
  if (template.includes("{FROM_PUBKEY}")) template = template.replace("{FROM_PUBKEY}", subFromPubkey);

  return { address: template, alternativesAvailable, bridge };
}
