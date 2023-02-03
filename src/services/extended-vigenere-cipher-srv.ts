import ICipherSrv from "./cipher-srv";

class ExtendedVigenereCipher implements ICipherSrv {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(data: string): string {
    let cipher = "";

    for (let i = 0; i < data.length; i++) {
      let x =
        (data[i].charCodeAt(0) + this.key[i % this.key.length].charCodeAt(0)) %
        256;
      cipher += String.fromCharCode(x);
    }
    return cipher;
  }

  encryptArrayBuffer(data: ArrayBuffer): ArrayBuffer {
    let cipher = new Uint8Array(data.byteLength);
    let dataView = new Uint8Array(data);

    for (let i = 0; i < data.byteLength; i++) {
      let x = (dataView[i] + this.key[i % this.key.length].charCodeAt(0)) % 256;
      cipher[i] = x;
    }

    return cipher;
  }

  decrypt(data: string): string {
    let cipher = "";

    for (let i = 0; i < data.length; i++) {
      let x =
        (data[i].charCodeAt(0) -
          this.key[i % this.key.length].charCodeAt(0) +
          256) %
        256;
      cipher += String.fromCharCode(x);
    }
    return cipher;
  }

  decryptArrayBuffer(data: ArrayBuffer): ArrayBuffer {
    let cipher = new Uint8Array(data.byteLength);
    let dataView = new Uint8Array(data);

    for (let i = 0; i < data.byteLength; i++) {
      let x =
        (dataView[i] - this.key[i % this.key.length].charCodeAt(0) + 256) % 256;
      cipher[i] = x;
    }

    return cipher;
  }
}

export default ExtendedVigenereCipher;
