import { Input } from "@/components";
import { useState } from "react";
import { AffineCipherSrv } from "@/services";

const AffineCipher = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");

	const onEncrypt = () => {
		const intA = parseInt(a);
		const intB = parseInt(b);

    const affineCipherSrv = new AffineCipherSrv(intA, intB);
    const result = affineCipherSrv.encrypt(msg);
    setResult(result);
  };

	const onDecrypt = () => {
		const intA = parseInt(a);
		const intB = parseInt(b);

    const affineCipherSrv = new AffineCipherSrv(intA, intB);
    const result = affineCipherSrv.decrypt(msg);
    setResult(result);
  };

  return (
    <div>
      <h1>Affine Cipher</h1>
      <Input
        inputHandlers={[
          {
            inputVal: a,
            onChangeInput: (e) => setA(e.target.value),
            name: "affine cipher a",
            placeholder: "affine cipher a",
          },
          {
            inputVal: b,
            onChangeInput: (e) => setB(e.target.value),
            name: "affine cipher b",
            placeholder: "affine cipher b",
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

export default AffineCipher;
