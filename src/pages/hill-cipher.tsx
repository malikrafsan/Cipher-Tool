import { Input } from "@/components";
import { useState } from "react";
import { HillCipherSrv } from "@/services";

const HillCipher = () => {
  const [key, setKey] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

  const onEncrypt = () => {
    const hillCipherSrv = new HillCipherSrv(key);
    const result = hillCipherSrv.encrypt(msg);
    setResult(result);
  };

  return (
    <div>
      <h1>Hill Cipher</h1>
      <Input
        encryptionKey={key}
        onChangeEncryptionKey={(e) => setKey(e.target.value)}
        msg={msg}
        onChangeMsg={(e) => setMsg(e.target.value)}
        onEncrypt={onEncrypt}
        onDecrypt={() => {}}
        result={result}
      />
    </div>
  );
};

export default HillCipher;
