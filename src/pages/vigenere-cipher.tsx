import { useState } from "react";

import { Layout } from "@/components";
import { VigenereCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const VigenereCipher = () => {
  const [key, setKey] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

	const onEncrypt = () => {
    const affineCipherSrv = new VigenereCipherSrv(key);
    const result = affineCipherSrv.encrypt(msg);
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

  const onDownload = () => {
    if (!FileExtractorSrv.download(result, "myFile.txt")) {
      alert("Download failed");
    }
  };

  return (
    <div>
      <h1>Vigenere Cipher</h1>
      <Layout
        onEncrypt={onEncrypt}
        onDecrypt={onDecrypt}
        result={result}
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
