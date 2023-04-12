import { BridgesFromUser } from "./base";

export class XMPPAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): XMPPAddress {
    if (str.includes('@')) {
      const [username, domain] = str.split('@');
      if (domain.includes('/')) {
        const [domain2, xmpp_resource] = domain.split('/');
        return new XMPPAddress(domain2, username, xmpp_resource);
      }
      return new XMPPAddress(domain, username);
    } else {
      if (str.includes('/')) {
        const [domain, xmpp_resource] = str.split('/');
        return new XMPPAddress(domain, null, xmpp_resource);
      }
      return new XMPPAddress(str, null);
    }
  }
  constructor(
    public domain: string,
    public username?: string,
    public xmpp_resource?: string,
  ) {}
  /** Returns the mention-form of the user.
   * To get the full canonical actor URI, you'll have to look up the webfinger. */
  public toString(): string {
    if (this.username === null) return this.domain;
    return `${this.username}@${this.domain}`;
  }

  /** Performs JID escaping on the given string. */
  public static escapeString(jid): string {
    // escape according to XEP-0106
    return jid
      .replace(/\\/g, '\\5c')
      .replace(/ /g, '\\20')
      .replace(/"/g, '\\22')
      .replace(/&/g, '\\26')
      .replace(/'/g, '\\27')
      .replace(/\//g, '\\2f')
      .replace(/:/g, '\\3a')
      .replace(/</g, '\\3c')
      .replace(/>/g, '\\3e')
      .replace(/@/g, '\\40');
  }
  /** Performs JID unescaping on the given string. */
  public static unescapeString(jid): string {
    // unescape according to XEP-0106
    return jid
      .replace(/\\20/g, ' ')
      .replace(/\\22/g, '"')
      .replace(/\\26/g, '&')
      .replace(/\\27/g, "'")
      .replace(/\\2f/g, '/')
      .replace(/\\3a/g, ':')
      .replace(/\\3c/g, '<')
      .replace(/\\3e/g, '>')
      .replace(/\\40/g, '@')
      .replace(/\\5c/g, '\\');
  }
  // public static escapeJID(jid): string {
  //   var jid2: string, resource: string, username: string, domain: string;
  //   if (jid.includes('/')) {
  //     [jid2, resource] = jid.split('/');
  //     if (jid2.includes('@')) {
  //       [username, domain] = jid2.split('@');
  //     }
  //   }
  //   for (const part in [username, domain, resource]) {
  //     var value: string;
  //     switch (part) {
  //       case username || 0:
  //         value = username;
  //         break;
  //       case domain || 1:
  //         value = domain;
  //         break;
  //       case resource || 2:
  //         value = resource;
  //         break;
  //     }
  //     value = this.escapeString(value);
  //     switch (part) {
  //       case username || 0:
  //         username = value;
  //         break;
  //       case domain || 1:
  //         domain = value;
  //         break;
  //       case resource || 2:
  //         resource = value;
  //         break;
  //     }
  //   }
  //   if (username && resource) {
  //     return `${username}@${domain}/${resource}`;
  //   } else if (username) {
  //     return `${username}@${domain}`;
  //   } else if (resource) {
  //     return `${domain}/${resource}`;
  //   } else {
  //     return domain;
  //   }
  // }
}