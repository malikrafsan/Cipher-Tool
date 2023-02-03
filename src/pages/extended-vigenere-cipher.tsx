import { useState } from "react";

import { Layout } from "@/components";
import { ExtendedVigenereCipherSrv, FileExtractorSrv } from "@/services";

const ExtendedVigenereCipher = () => {
  const [key, setKey] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgBuffer, setMsgBuffer] = useState<ArrayBuffer>();
  const [result, setResult] = useState("");
  const [resultBuffer, setResultBuffer] = useState<ArrayBuffer>();

	const onEncrypt = () => {
    const extendedVigenereCipher = new ExtendedVigenereCipherSrv(key);
    const encrypt = extendedVigenereCipher.encryptArrayBuffer(msgBuffer);
    let enc = new TextDecoder("utf-8");
    setResult(enc.decode(encrypt))
    setResultBuffer(encrypt);
    console.log(encrypt)
  };

  const onDecrypt = async () => {
    const extendedVigenereCipher = new ExtendedVigenereCipherSrv(key);
    const decrypt = extendedVigenereCipher.decryptArrayBuffer(msgBuffer);
    let enc = new TextDecoder("utf-8");
    setResult(enc.decode(decrypt))
    setResultBuffer(decrypt);
  };

  const onReadFile = (file: File) => {
    const reader = new FileReader();
    console.log(file.type)

    const callback = (file: File) => {
      const newFile = file;
      return (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = new Uint8Array(e.target.result as ArrayBuffer);
        setMsgBuffer(arrayBuffer)
        let enc = new TextDecoder("utf-8");
        setMsg(enc.decode(arrayBuffer))
        setFileType(newFile.type);
        setFileName(newFile.name);
      };
    }

    reader.onload = callback(file);

    reader.readAsArrayBuffer(file);
  };

  const onDownload = () => {
    const blob = new Blob([resultBuffer], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    FileExtractorSrv.downloadFile(file, fileName);
  };

  return (
    <div>
      <h1>Extended Vigenere Cipher</h1>
      <Layout
        onEncrypt={onEncrypt}
        onDecrypt={onDecrypt}
        result={result}
        setResult={setResult}
        onDownload={onDownload}
        onReadFile={onReadFile}
        onInput={(str) => setMsg(str)}
        textInput={msg}
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

export default ExtendedVigenereCipher;
