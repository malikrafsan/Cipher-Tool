import { useState } from "react";

import { Layout, Navbar } from "@/components";
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
    if(fileType !== "") {
      let encrypt = extendedVigenereCipher.encryptArrayBuffer(msgBuffer);
      setResultBuffer(encrypt);
    } else {
      let encrypt = extendedVigenereCipher.encrypt(msg);
      setResult(encrypt)
    }
  };

  const onDecrypt = async () => {
    const extendedVigenereCipher = new ExtendedVigenereCipherSrv(key);
    if(fileType !== "") {
      let decrypt = extendedVigenereCipher.decryptArrayBuffer(msgBuffer);
      setResultBuffer(decrypt);
    } else {
      let decrypt = extendedVigenereCipher.decrypt(msg);
      setResult(decrypt)
    }
  };

  const onReadFile = (file: File) => {
    const reader = new FileReader();

    const callback = (file: File) => {
      const newFile = file;
      return (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = new Uint8Array(e.target.result as ArrayBuffer);
        setMsgBuffer(arrayBuffer)
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
      <Navbar />
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
