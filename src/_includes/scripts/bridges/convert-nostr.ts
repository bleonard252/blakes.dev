import { BridgesFromUser } from "./base";

export class NostrAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): NostrAddress {
    if (str.startsWith('npub')) {
      return new NostrAddress(str);
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