import {
  HillCipherSrv,
  AffineCipherSrv,
  AutoKeyVigenereCipherSrv,
  VigenereCipherSrv
} from "../src/services";

const TestVigenereCipherSrv = () => {
  const text = "ET TU, BRUTE?"

  const affineCipherSrv = new VigenereCipherSrv("JULIUS");
  const encrypted = affineCipherSrv.encrypt(text);
  const decrypted = affineCipherSrv.decrypt(encrypted);

  if (decrypted !== text) {
    throw new Error("AffineCipherSrv failed");
  }

  console.log("TestAffineCipherSrv passed");
}

const TestAffineCipherSrv = () => {
  const text = "AFFINE CIPHER"

  const affineCipherSrv = new AffineCipherSrv(17, 20);
  const encrypted = affineCipherSrv.encrypt(text);
  const decrypted = affineCipherSrv.decrypt(encrypted);

  if (decrypted !== text) {
    throw new Error("AffineCipherSrv failed");
  }

  console.log("TestAffineCipherSrv passed");
}

const TestAutoKeyVigenereCipherSrv = () => {
  const text = "HELLO"

  const autoKeyVigenereCipherSrv = new AutoKeyVigenereCipherSrv("N");
  const encrypted = autoKeyVigenereCipherSrv.encrypt(text);
  const decrypted = autoKeyVigenereCipherSrv.decrypt(encrypted);

  if (decrypted !== text) {
    throw new Error("AutoKeyVigenereCipherSrv failed");
  }

  console.log("TestAutoKeyVigenereCipherSrv passed");
}

const main = () => {
  TestVigenereCipherSrv();
  TestAffineCipherSrv();
  TestAutoKeyVigenereCipherSrv();
}


export default main;
