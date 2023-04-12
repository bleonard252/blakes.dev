export abstract class BridgesFromUser {
  /** Corresponds to the substitution string {FROM_DOMAIN}. */
  domain: string;
  /** Corresponds to the substitution string {FROM_USER}. */
  username: string;
  /** Corresponds to the substitution string {FROM}. */
  toString(): string;
  /** Corresponds to the substitution string {FROM_PUBKEY}. */
  pubkey: string;
}