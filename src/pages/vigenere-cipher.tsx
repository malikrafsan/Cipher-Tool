import { useState } from "react";

import { Input } from "@/components";
import { VigenereCipherSrv } from "@/services";

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

  return (
    <div>
      <h1>Vigenere Cipher</h1>
      <Input
        inputHandlers={[
          {
            inputVal: key,
            onChangeInput: (e) => setKey(e.target.value),
            name: "key",
            placeholder: "key",
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

export default VigenereCipher;
