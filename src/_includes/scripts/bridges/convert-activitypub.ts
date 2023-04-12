import { BridgesFromUser } from "./base";

export class ActivityPubAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): ActivityPubAddress {
    if (str.includes('/@') || str.match(/^https?:\/\//)?.length) {
      const url = new URL(str);
      const username = url.pathname.split('/').pop();
      return new ActivityPubAddress(url.hostname, username.replace(/^@/, ''));
    } else {
      if (str.startsWith('@')) str = str.slice(1);
      const [username, domain] = str.split('@');
      return new ActivityPubAddress(domain, username);
    }
  }
  constructor(
    public domain: string,
    public username: string,
  ) {}
  /** Returns the mention-form of the user.
   * To get the full canonical actor URI, you'll have to look up the webfinger. */
  public toString(): string {
    return `@${this.username}@${this.domain}`;
  }
}