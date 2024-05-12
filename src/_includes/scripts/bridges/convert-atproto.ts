import { BridgesFromUser } from "./base";

/** WARNING: This class does not support DIDs. It uses Bluesky-style
 *  domain handles ONLY. */
export class ATProtoHandle implements Partial<BridgesFromUser> {
  public static fromString(str: string): ATProtoHandle {
    if (str.startsWith('@')) str = str.slice(1);
    return new ATProtoHandle(str);
  }
  constructor(
    public domain: string,
  ) {}
  /** Returns the mention-form of the user. */
  public toString(): string {
    return `@${this.domain}`;
  }
}
