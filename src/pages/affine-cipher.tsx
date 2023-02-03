import { Layout, Navbar } from "@/components";
import { useState } from "react";
import { AffineCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const AffineCipher = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

  const onEncrypt = () => {
    const affineCipherSrv = new AffineCipherSrv(a, b);
    const cleaned = TextProcessor.clean(msg);
    const result = affineCipherSrv.encrypt(cleaned);
    setResult(result);
  };

  const onDecrypt = () => {
    const affineCipherSrv = new AffineCipherSrv(a, b);
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
      <Navbar />
      <h1>Affine Cipher</h1>
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
          type="number"
          value={a}
          onChange={(e) => setA(parseInt(e.target.value))}
          placeholder="affine cipher a"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(parseInt(e.target.value))}
          placeholder="affine cipher b"
        />
      </Layout>
    </div>
  );
};

export default AffineCipher;
