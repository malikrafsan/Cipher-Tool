import ApiSrv from "./api-srv";

class CipherApiSrv extends ApiSrv {
  constructor() {
    const url = process.env.CIPHER_API_URL || "http://localhost:5000";
    super(url);
  }
}

export default CipherApiSrv;
