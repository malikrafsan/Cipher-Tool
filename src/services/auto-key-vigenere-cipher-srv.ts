import ICipherSrv from "./cipher-srv";
import { TextProcessor } from "../services";

class AutoKeyVigenereCipher implements ICipherSrv {
  private key: string;
  private readonly OFFSET = "A".charCodeAt(0);

  constructor(key: string) {
    key = TextProcessor.clean(key);
    this.key = key;
  }

  encrypt(data: string): string {
    const len = data.length;

    const tempNewKey = this.key + data;
    const newKey = tempNewKey.substring(0, tempNewKey.length - this.key.length);

    let cipher = "";
    for (let x = 0; x < len; x++) {
      const first = data[x].charCodeAt(0) - this.OFFSET;
      const second = newKey[x].charCodeAt(0) - this.OFFSET;
      const sum = (first + second) % 26;
      const cipherChar = String.fromCharCode(sum + this.OFFSET);
      cipher += cipherChar;
    }

    return cipher;
  }

  decrypt(data: string): string {
    let curKey = this.key;
    let raw = "";

    for (let x = 0; x < data.length; x++) {
      const first = data[x].charCodeAt(0) - this.OFFSET;
      const second = curKey[x].charCodeAt(0) - this.OFFSET;
      const sum = (first - second + 26) % 26;

      const rawChar = String.fromCharCode(sum + this.OFFSET);
      raw += rawChar;
      curKey += rawChar;
    }
    return raw;
  }
}

export default AutoKeyVigenereCipher;
