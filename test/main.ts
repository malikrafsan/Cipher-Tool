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

const testSrv = async (test: ITest) => {
  const { srv, text, noCleanText, customCompare } = test;

  const cleanedText = !noCleanText ? TextProcessor.clean(text) : text;

  const cipher = await srv.encrypt(cleanedText);
  const decrypted = await srv.decrypt(cipher);

  const flag = customCompare
    ? customCompare(cleanedText, decrypted)
    : decrypted === cleanedText;
  if (!flag) {
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

interface ITest {
  srv: ICipherSrv;
  text: string;
  noCleanText?: boolean;
  customCompare?: (text: string, decrypt: string) => boolean;
}

const hillCipherComparator = (text: string, decrypt: string) => {
  const clipDecrypt = decrypt.slice(0, text.length);
  return clipDecrypt === text;
};

const HillCipherTest = [
  {
    srv: new HillCipherSrv([
      [1, 5],
      [3, 4],
    ]),
    text: "hiLL CIpHEr",
  },
  {
    srv: new HillCipherSrv([
      [1, 5],
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

const HillCipherTestWithComparator = HillCipherTest.map((e) => {
  return {
    ...e,
    customCompare: hillCipherComparator,
  };
});

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

const PlayFairCipherTest = [
  {
    srv: new PlayFairCipherSrv("playfair example"),
    text: "Hide the gold in the tree stump",
  },
  {
    srv: new PlayFairCipherSrv("playfair example again"),
    text: "Hide the gold in the tree stump while you can because the police is coming",
  },
  {
    srv: new PlayFairCipherSrv("playfair example again and again"),
    text: "Hide the gold in the tree stump while you can because the police is coming, if you fail to do so, you will be arrested",
  },
];

const VigenereCipherTest = [
  {
    srv: new VigenereCipherSrv("Vigenere"),
    text: "Vigenere Cipher",
  },
  {
    srv: new VigenereCipherSrv("Vigenere Cipher"),
    text: "Vigenere Cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword. It is a form of polyalphabetic substitution.",
  },
  {
    srv: new VigenereCipherSrv("Vigenere Cipher again"),
    text: "Vigenere Cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword. It is a form of polyalphabetic substitution. This method is easy to understand and implement, but it is not secure enough for modern applications.",
  }
]

const main = () => {
  const testCases: ITest[] = [
    ...HillCipherTestWithComparator,
    ...AffineCipherTest,
    ...AutoKeyVigenereCipherTest,
    ...ExtendedVigenereCipherTest,
    ...PlayFairCipherTest,
    ...VigenereCipherTest,
  ];

  testCases.forEach(async (testCase) => {
    try {
      await testSrv(testCase);
    } catch (err) {
      console.log(err);
    }
  });
};

main();
