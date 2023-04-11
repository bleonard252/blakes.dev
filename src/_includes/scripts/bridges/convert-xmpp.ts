import { BridgesFromUser } from "./base";

export class XMPPAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): XMPPAddress {
    if (str.includes('@')) {
      const [domain, username] = str.split('@');
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
}