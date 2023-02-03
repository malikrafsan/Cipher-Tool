import ServicesTest from "./services-test";
import {
  ICipherSrv,
  HillCipherSrv,
  AffineCipherSrv,
  AutoKeyVigenereCipherSrv,
  VigenereCipherSrv,
  ExtendedVigenereCipherSrv,
  PlayFairCipherSrv,
  ApiSrv,
  CipherApiSrv,
  FileExtractorSrv,
  TextProcessor,
} from "../src/services";

const testSrv = async (
  srv: ICipherSrv,
  text: string,
  cleanText: boolean = true
) => {
  const cleanedText = cleanText ? TextProcessor.clean(text) : text;

  const cipher = await srv.encrypt(cleanedText);
  const decrypted = await srv.decrypt(cipher);

  if (decrypted !== cleanedText) {
    throw new Error(
      "TestSrv failed: " +
        srv.constructor.name +
        " " +
        JSON.stringify({
          text,
          cipher,
          decrypted,
        })
    );
  }

  console.log("TestSrv passed: " + srv.constructor.name);
  return true;
};

const HillCipherTest = [
  {
    srv: new HillCipherSrv([
      [1, 2],
      [3, 4],
    ]),
    text: "hiLL CIpHEr",
  },
  {
    srv: new HillCipherSrv([
      [1, 2],
      [3, 4],
    ]),
    text: "HilL CIPHERA",
  },
  {
    srv: new HillCipherSrv([
      [1, 2, 2],
      [3, 15, 4],
      [12, 3, 21],
    ]),
    text: "HILL CIPHER",
  },
];

const AffineCipherTest = [
  {
    srv: new AffineCipherSrv(17, 20),
    text: "AFFINE CIPHER",
  },
  {
    srv: new AffineCipherSrv(15, 17),
    text: "affine CIPHer",
  },
  {
    srv: new AffineCipherSrv(3, 10),
    text: "aFFine CIPHer",
  },
];

const AutoKeyVigenereCipherTest = [
  {
    srv: new AutoKeyVigenereCipherSrv("N"),
    text: "HELLO",
  },
  {
    srv: new AutoKeyVigenereCipherSrv("ArgH"),
    text: "LIGHT SPeeD chewie NOW",
  },
  {
    srv: new AutoKeyVigenereCipherSrv("aa"),
    text: "HEll",
  },
];

const ExtendedVigenereCipherTest = [
  {
    srv: new ExtendedVigenereCipherSrv("[]\\;'<>/.,"),
    text: "HE ]\\;' LLO world gan anjay",
  },
  {
    srv: new ExtendedVigenereCipherSrv("malik[]\\;'<>/.,"),
    text: "HELLO wor]\\;' ld gan anjay ggwp gagal kah bismillah",
  },
  {
    srv: new ExtendedVigenereCipherSrv("[]\\;'<>😅🥂🙃halo"),
    text: "HELLO world gan ]\\;' anjay ggwp gagal kah bismillah usman banyak bicara weh++",
  },
];

const main = () => {
  const testCases = [
    ...HillCipherTest,
    ...AffineCipherTest,
    ...AutoKeyVigenereCipherTest,
    ...ExtendedVigenereCipherTest,
  ];

  testCases.forEach((testCase) => {
    testSrv(testCase.srv, testCase.text);
  });
};

main();
