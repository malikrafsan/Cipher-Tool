import ICipherSrv from "./cipher-srv";
import CipherApiSrv from "./cipher-api-srv";

class HillCipherSrv implements ICipherSrv {
  private readonly matKey: number[][];
  private readonly cipherApiSrv: CipherApiSrv;

  constructor(matKey: number[][]) {
    this.matKey = matKey;
    this.cipherApiSrv = new CipherApiSrv();
  }
  
  async encrypt(data: string) {
    const resp = await this.cipherApiSrv.get<string>("/hill-cipher/encrypt", {
      msg: data,
      key: this.matKey,
    })

    return resp;
  }

  async decrypt(data: string) {
    const resp = await this.cipherApiSrv.get<string>("/hill-cipher/decrypt", {
      msg: data,
      key: this.matKey,
    })

    return resp;
  }
}

export default HillCipherSrv;
