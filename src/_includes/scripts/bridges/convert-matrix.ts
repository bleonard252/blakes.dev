import { BridgesFromUser } from "./base";

export class MatrixAddress implements Partial<BridgesFromUser> {
  public static fromString(str: string): MatrixAddress {
    const sigil = str[0];
    if (str.startsWith('@') || str.startsWith('#')) {
      const [username, domain] = str.slice(1).split(':');
      return new MatrixAddress(sigil == '@' ? 'user' : 'room', username, domain);
    } else {
      throw new Error(`Invalid Matrix address (must start with @ or #): ${str}`);
    }
  }
  constructor(
    public matrix_type: 'user' | 'room',
    public username: string,
    public domain: string,
  ) {}
  get sigil() {return this.matrix_type == 'user' ? '@' : '#'}
  /** Returns the mention-form of the user.
   * To get the full canonical actor URI, you'll have to look up the webfinger. */
  public toString(): string {
    return `${this.sigil}${this.username}:${this.domain}`;
  }
}