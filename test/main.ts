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
  noCleanText: boolean = false
) => {
  const cleanedText = !noCleanText ? TextProcessor.clean(text) : text;

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
    noCleanText: false,
  },
  {
    srv: new HillCipherSrv([
      [1, 2],
      [3, 4],
    ]),
    text: "HilL CIPHERA",
    noCleanText: false,
  },
  {
    srv: new HillCipherSrv([
      [1, 2, 2],
      [3, 15, 4],
      [12, 3, 21],
    ]),
    text: "HILL CIPHER",
    noCleanText: false,
  },
];

const AffineCipherTest = [
  {
    srv: new AffineCipherSrv(17, 20),
    text: "AFFINE CIPHER",
    noCleanText: false,
  },
  {
    srv: new AffineCipherSrv(15, 17),
    text: "affine CIPHer",
    noCleanText: false,
  },
  {
    srv: new AffineCipherSrv(3, 10),
    text: "aFFine CIPHer",
    noCleanText: false,
  },
];

const AutoKeyVigenereCipherTest = [
  {
    srv: new AutoKeyVigenereCipherSrv("N"),
    text: "HELLO",
    noCleanText: false,
  },
  {
    srv: new AutoKeyVigenereCipherSrv("ArgH"),
    text: "LIGHT SPeeD chewie NOW",
    noCleanText: false,
  },
  {
    srv: new AutoKeyVigenereCipherSrv("aa"),
    text: "HEll",
    noCleanText: false,
  },
];

const ExtendedVigenereCipherTest = [
  {
    srv: new ExtendedVigenereCipherSrv("[]\\;'<>/.,"),
    text: "HE ]\\;' LLO world gan anjay",
    noCleanText: true,
  },
  {
    srv: new ExtendedVigenereCipherSrv("malik[]\\;'<>/.,"),
    text: "HELLO wor]\\;' ld gan anjay ggwp gagal kah bismillah",
    noCleanText: true,
  },
  {
    srv: new ExtendedVigenereCipherSrv("[]\\;'<>😅🥂🙃halo"),
    text: "HELLO world gan ]\\;' anjay ggwp gagal kah bismillah usman banyak bicara weh++",
    noCleanText: true,
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
    testSrv(testCase.srv, testCase.text, testCase.noCleanText);
  });
};

main();
