import { useState } from "react";

import { Layout, Navbar } from "@/components";
import { VigenereCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const VigenereCipher = () => {
  const [key, setKey] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

	const onEncrypt = () => {
    const affineCipherSrv = new VigenereCipherSrv(key);
    const cleaned = TextProcessor.clean(msg);
    const result = affineCipherSrv.encrypt(cleaned);
    setResult(result);
  };

  const onDecrypt = () => {
    const affineCipherSrv = new VigenereCipherSrv(key);
    const result = affineCipherSrv.decrypt(msg);
    setResult(result);
  };

  const onReadFile = async (file: File) => {
    if (file.type !== "text/plain") {
      alert("File must be text");
      return;
    }

    const text = await FileExtractorSrv.readTxtFile(file);
    setMsg(text);
  };

  const onDownload = (filename: string) => {
    if (!FileExtractorSrv.download(result, filename)) {
      alert("Download failed");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Vigenere Cipher</h1>
      <Layout
        onEncrypt={onEncrypt}
        onDecrypt={onDecrypt}
        result={result}
        setResult={setResult}
        onInput={(str) => setMsg(str)}
        textInput={msg}
        onDownload={onDownload}
        onReadFile={onReadFile}
      >
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="key"
        />
      </Layout>
    </div>
  );
};

export default VigenereCipher;
