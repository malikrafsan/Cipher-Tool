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

  const onDecrypt = () => {
    const hillCipherSrv = new HillCipherSrv(key);
    const result = hillCipherSrv.decrypt(msg);
    setResult(result);
  };

  return (
    <div>
      <h1>Hill Cipher</h1>
      <Input
        inputHandlers={[
          {
            inputVal: key,
            onChangeInput: (e) => setKey(e.target.value),
            name: "hill cipher key",
            placeholder: "hill cipher key",
          },
        ]}
        msg={msg}
        onChangeMsg={(e) => setMsg(e.target.value)}
        onEncrypt={onEncrypt}
        onDecrypt={onDecrypt}
        result={result}
      />
    </div>
  );
};

export default HillCipher;
