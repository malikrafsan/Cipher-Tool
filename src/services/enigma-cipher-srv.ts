import ICipherSrv from "./cipher-srv";

class EnigmaCipherSrv implements ICipherSrv {
  private key: string[];
  private offsetKey = 0;
  private keys: string[];

  constructor(keys: string[]) {
    this.keys = keys;
    this.key = this.buildKey(keys);
  }

  private buildKey(keys: string[]) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const key = keys.map((x) => {
      const idxKey = alphabet.indexOf(x);
      const left = alphabet.substring(idxKey);
      const right = alphabet.substring(0, idxKey);

      return left + right;
    });

    return key;
  }

  private power(base: number, exp: number) {
    let result = 1;
    for (let i = 0; i < exp; i++) {
      result *= base;
    }

    return result;
  }

  private encryptPerLetter(data: string) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let temp = data;

    for (let i = 0; i < this.key.length; i++) {
      const idx = alphabet.indexOf(temp);
      temp = this.key[i][idx];
    }

    this.incrementOffsetKey();
    return temp;
  }

  private incrementOffsetKey() {
    this.offsetKey++;

    for (let i = 0; i < this.key.length; i++) {
      if (this.offsetKey % this.power(26, this.key.length - i - 1) === 0) {
        this.key[i] = this.key[i].substring(1) + this.key[i][0];

        if (i !== this.key.length - 1) {
          console.log(this.key);
        }
      }
    }
  }

  encrypt(data: string): string {
    const encrypt = Array.from(data).map((e,i) => {
      return this.encryptPerLetter(e);
    });
    return encrypt.join("");
  }

  private decryptPerLetter(data: string): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let temp = data;


    for (let i = this.key.length - 1; i >= 0; i--) {
      const idx = this.key[i].indexOf(temp);
      temp = alphabet[idx];
    }

    this.decrementOffsetKey();
    return temp;
  }

  private decrementOffsetKey() {
    this.offsetKey--;

    for (let i = 0; i < this.key.length; i++) {
      if (this.offsetKey == 0 && i !== this.key.length - 1) {
        continue
      }

      if (this.offsetKey % this.power(26, this.key.length - i - 1) === 0) {
        this.key[i] =
          this.key[i][this.key[i].length - 1] +
          this.key[i].substring(0, this.key[i].length - 1);
      }
    }
  }

  decrypt(data: string): string {
    // this.offsetKey = data.length;
    // this.decrementOffsetKey();
    this.reformatOffsetKey(data);

    const decrypt = Array.from(data).reverse().map((e, i) => {
      return this.decryptPerLetter(e);
    }).reverse();
    return decrypt.join("");
  }

  reformatOffsetKey(data: string) {
    this.offsetKey = 0;
    this.key = this.buildKey(this.keys);
    for (let i = 0; i < data.length; i++) {
      this.incrementOffsetKey();
    }

    this.offsetKey = data.length;
    for (let i = 0; i < this.key.length; i++) {
      if (this.offsetKey % this.power(26, this.key.length - i - 1) === 0) {
        this.key[i] =
          this.key[i][this.key[i].length - 1] +
          this.key[i].substring(0, this.key[i].length - 1);
      }
    }
  }
}

export default EnigmaCipherSrv;
