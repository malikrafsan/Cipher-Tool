import ICipherSrv from "./cipher-srv";

class AffineCipherSrv implements ICipherSrv {
  private a: number;
  private b: number;
  private readonly OFFSET = "A".charCodeAt(0);

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  encrypt(data: string): string {
    let cipher = "";
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      if (char != " ") {
        const charCode = char.charCodeAt(0) - this.OFFSET;
        const cipherCharCode = (this.a * charCode + this.b) % 26;
        const cipherChar = String.fromCharCode(cipherCharCode + this.OFFSET);
        cipher += cipherChar;
      } else {
        cipher += " ";
      }
    }

    return cipher;
  }

  decrypt(data: string): string {
    let msg = "";
    let aInv = 0;
    let flag = 0;

    for (let i = 0; i < 26; i++) {
      flag = (this.a * i) % 26;

      if (flag == 1) {
        aInv = i;
      }
    }

    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      if (char != " ") {
        const charCode = char.charCodeAt(0) + this.OFFSET;
        const msgCharCode = (aInv * (charCode - this.b)) % 26;
        const msgChar = String.fromCharCode(msgCharCode + this.OFFSET);
        msg += msgChar;
      } else {
        msg += " ";
      }
    }

    return msg;
  }
}

export default AffineCipherSrv;
