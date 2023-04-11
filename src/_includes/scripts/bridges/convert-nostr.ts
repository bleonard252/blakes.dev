import { BridgesFromUser } from "./base";

export class NostrAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): NostrAddress {
    if (str.startsWith('npub')) {
      return new NostrAddress(str);
    } else if (str.includes('@')) {
      return new NostrAddress(null, str.split('@')[0], str.split('@')[1]);
    } else {
      return new NostrAddress(str);
    }
  }
  constructor(
    public pubkey?: string,
    public username?: string,
    public domain?: string,
  ) {};
  public toString(): string {
    return this.pubkey;
  }
}