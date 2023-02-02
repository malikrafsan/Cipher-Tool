import { Layout } from "@/components";
import { useState } from "react";
import { HillCipherSrv, FileExtractorSrv, TextProcessor } from "@/services";

const HillCipher = () => {
  const [size, setSize] = useState(0);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [msg, setMsg] = useState("");
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

  const handleEncrypt = async () => {
    const hcSrv = new HillCipherSrv(matrix);

    const cleaned = TextProcessor.clean(msg);
    const resp = await hcSrv.encrypt(cleaned);
    console.log(resp);
    setResult(resp);
  }

  const handleDecrypt = async () => {
    const hcSrv = new HillCipherSrv(matrix);
    const resp = await hcSrv.decrypt(msg);
    console.log(resp);
    setResult(resp);
  }

  const onReadFile = async (file: File) => {
    if (file.type !== "text/plain") {
      alert("File must be text");
      return;
    }

    const text = await FileExtractorSrv.readTxtFile(file);
    setMsg(text);
  }

  const onDownload = () => {
    if (!FileExtractorSrv.download(result, "myFile.txt")) {
      alert("Download failed");
    }
  }

  return (
    <div>
      <h1>Hill Cipher</h1>
      <Layout
        onDownload={onDownload}
        onDecrypt={handleDecrypt}
        onEncrypt={handleEncrypt}
        onReadFile={onReadFile}
        onInput={(str) => setMsg(str)}
        textInput={msg}
        result={result}
      >
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
      </Layout>
    </div>
  );
};

export default HillCipher;
