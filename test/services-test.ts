import {
  HillCipherSrv,
  AffineCipherSrv,
  AutoKeyVigenereCipherSrv,
  VigenereCipherSrv,
  TextProcessor,
} from "../src/services";

const TestVigenereCipherSrv = () => {
  const text = "ET TU, BRUTE?";
  const cleanedText = TextProcessor.clean(text);

  const affineCipherSrv = new VigenereCipherSrv("JULIUS");
  const encrypted = affineCipherSrv.encrypt(cleanedText);
  const decrypted = affineCipherSrv.decrypt(encrypted);

  if (decrypted !== cleanedText) {
    throw new Error(
      "VigenereCipherSrv failed: " +
        JSON.stringify({
          encrypted,
          decrypted,
        })
    );
  }

  console.log("TestVigenereCipherSrv passed");
};

const TestAffineCipherSrv = () => {
  const text = "AFFINE CIPHER";
  const cleanedText = TextProcessor.clean(text);

  const affineCipherSrv = new AffineCipherSrv(17, 20);
  const encrypted = affineCipherSrv.encrypt(cleanedText);
  const decrypted = affineCipherSrv.decrypt(encrypted);

  if (decrypted !== cleanedText) {
    throw new Error(
      "AffineCipherSrv failed: " +
        JSON.stringify({
          encrypted,
          decrypted,
        })
    );
  }

  console.log("TestAffineCipherSrv passed");
};

const TestAutoKeyVigenereCipherSrv = () => {
  const text = "HELLO";
  const clenaedText = TextProcessor.clean(text);

  const autoKeyVigenereCipherSrv = new AutoKeyVigenereCipherSrv("N");
  const encrypted = autoKeyVigenereCipherSrv.encrypt(clenaedText);
  const decrypted = autoKeyVigenereCipherSrv.decrypt(encrypted);

  if (decrypted !== clenaedText) {
    throw new Error("AutoKeyVigenereCipherSrv failed");
  }

  console.log("TestAutoKeyVigenereCipherSrv passed");
};

const TestTextProcessor = () => {
  const text = "Hello, world!";

  const cleanedText = TextProcessor.clean(text);

  if (cleanedText !== "HELLOWORLD") {
    throw new Error(
      "TextProcessor failed: " +
        JSON.stringify({
          text,
          cleanedText,
        })
    );
  }

  console.log("TestTextProcessor passed");
};

const main = () => {
  TestVigenereCipherSrv();
  TestAffineCipherSrv();
  TestAutoKeyVigenereCipherSrv();
  TestTextProcessor();
};

export default main;
