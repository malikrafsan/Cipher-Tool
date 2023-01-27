import ICipherSrv from "./cipher-srv";

class VigenereCipher implements ICipherSrv {
  private key: string;
  private readonly OFFSET = "A".charCodeAt(0);

  constructor(key: string) {
    this.key = key;
  }

  encrypt(data: string): string {
    let cipher = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i] < 'A' || data[i] > 'Z')
        {
            data = data.substring(0, i) + data.substring(i + 1);
            i--;
        }
    }
  
    for (let i = 0; i < data.length; i++) {
        let x = (data[i].charCodeAt(0) + this.key[i % this.key.length].charCodeAt(0)) % 26;
        x += this.OFFSET;
        cipher += String.fromCharCode(x);
    }
    return cipher;
  }

  decrypt(data: string): string {
    let cipher = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i] < 'A' || data[i] > 'Z') {
            data = data.substring(0, i) + data.substring(i + 1);
            i--;
        }
    }
  
    for (let i = 0; i < data.length; i++) {
        let x = (data[i].charCodeAt(0) - this.key[i % this.key.length].charCodeAt(0) + 26) % 26;
        x += this.OFFSET;
        cipher += String.fromCharCode(x);
    }
    return cipher;
  }
}

export default VigenereCipher;
