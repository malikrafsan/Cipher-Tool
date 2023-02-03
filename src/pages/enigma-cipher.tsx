import { Layout, Navbar } from "@/components";
import { useState } from "react";
import { EnigmaCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const EnigmaCipher = () => {
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");

  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

  const onEncrypt = () => {
    const key1clean = TextProcessor.clean(key1)[0];
    const key2clean = TextProcessor.clean(key2)[0];
    const key3clean = TextProcessor.clean(key3)[0];

    const enigmaCipherSrv = new EnigmaCipherSrv([key1clean, key2clean, key3clean]);
    const cleaned = TextProcessor.clean(msg);
    const result = enigmaCipherSrv.encrypt(cleaned);
    setResult(result);
  }

  const onDecrypt = () => {
    const key1clean = TextProcessor.clean(key1)[0];
    const key2clean = TextProcessor.clean(key2)[0];
    const key3clean = TextProcessor.clean(key3)[0];

    const keys = [key1clean, key2clean, key3clean];
    console.log(keys);

    const enigmaCipherSrv = new EnigmaCipherSrv(keys);
    const result = enigmaCipherSrv.decrypt(msg);
    setResult(result);
  }

  const onReadFile = async (file: File) => {
    if (file.type !== "text/plain") {
      alert("File must be text");
      return;
    }

    const text = await FileExtractorSrv.readTxtFile(file);
    setMsg(text);
  }

  const onDownload = () => {
    if (!FileExtractorSrv.download(result, "myFile.txt")) {
      alert("Download failed");
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Enigma Cipher</h1>
      <Layout
        onDownload={onDownload}
        onDecrypt={onDecrypt}
        onEncrypt={onEncrypt}
        onReadFile={onReadFile}
        onInput={(str) => setMsg(str)}
        textInput={msg}
        result={result}
        setResult={setResult}
      >
        <input
          type="text"
          value={key1}
          onChange={(e) => setKey1(e.target.value)}
          placeholder="enigma rotor 1 starting position"
        />
        <input
          type="text"
          value={key2}
          onChange={(e) => setKey2(e.target.value)}
          placeholder="enigma rotor 2 starting position"
        />
        <input
          type="text"
          value={key3}
          onChange={(e) => setKey3(e.target.value)}
          placeholder="enigma rotor 3 starting position"
        />
      </Layout>
    </div>
  );
};

export default EnigmaCipher;
