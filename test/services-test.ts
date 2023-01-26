import { HillCipherSrv, AffineCipherSrv } from "../src/services";

const TestAffineCipherSrv = () => {
  console.log("TestAffineCipherSrv");

  const text = "AFFINE CIPHER"

  const affineCipherSrv = new AffineCipherSrv(17, 20);
  const encrypted = affineCipherSrv.encrypt(text);
  const decrypted = affineCipherSrv.decrypt(encrypted);

  if (decrypted !== text) {
    throw new Error("AffineCipherSrv failed");
  }

  console.log("TestAffineCipherSrv passed");
}

const main = () => {
  TestAffineCipherSrv();
}


export default main;
