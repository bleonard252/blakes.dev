export class ActivityPubAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): ActivityPubAddress {
    if (str.includes('/@') || str.match(/^https?:\/\//).length > 0) {
      const url = new URL(str);
      const username = url.pathname.split('/').pop();
      return new ActivityPubAddress(url.hostname, username);
    } else {
      if (str.startsWith('@')) str = str.slice(1);
      const [domain, username] = str.split('@');
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