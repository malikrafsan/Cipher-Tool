import { Input } from "@/components";
import { useState } from "react";
import { HillCipherSrv } from "@/services";

const HillCipher = () => {
  const [size, setSize] = useState(0);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    const intSize = parseInt(size);

    if (size === "" || intSize <= 0) {
      setSize(intSize);
      return setMatrix([]);
    }

    const mat = Array.from(Array(intSize), () => new Array(intSize).fill(0));
    setSize(intSize);
    setMatrix(mat);
  };

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  }

  const handleEncrypt = async () => {
    const hcSrv = new HillCipherSrv(matrix);
    const resp = await hcSrv.encrypt(key);
    console.log(resp);
    setResult(resp);
  }

  const handleDecrypt = async () => {
    const hcSrv = new HillCipherSrv(matrix);
    const resp = await hcSrv.decrypt(key);
    console.log(resp);
    setResult(resp);
  }

  return (
    <div>
      <h1>Hill Cipher</h1>
      <div>
        <input type="number" value={size} onChange={handleChangeSize} />
      </div>
      <div>
        {matrix.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <input
                key={j}
                type="number"
                value={col}
                onChange={(e) => {
                  const newMatrix = [...matrix];
                  newMatrix[i][j] = parseInt(e.target.value);
                  setMatrix(newMatrix);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={key} onChange={handleChangeKey}/>
      </div>
      <div>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default HillCipher;
