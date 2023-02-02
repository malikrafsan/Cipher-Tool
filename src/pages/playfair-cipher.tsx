import { useState } from "react";

import { Layout } from "@/components";
import { PlayFairCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const PlayFairCipher = () => {
  const [key, setKey] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

  const onEncrypt = () => {
    const cleanKey = TextProcessor.clean(key);
    const affineCipherSrv = new PlayFairCipherSrv(cleanKey);
    const cleaned = TextProcessor.clean(msg);
    const result = affineCipherSrv.encrypt(cleaned);
    setResult(result);
  };

  const onDecrypt = () => {
    const cleanKey = TextProcessor.clean(key);
    const affineCipherSrv = new PlayFairCipherSrv(cleanKey);
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
      <h1>Play Fair Cipher</h1>
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

export default PlayFairCipher;
