import { useState } from "react";

import styles from "./index.module.css";
import { TextProcessor } from "@/services";
import { FormatOptions as FO } from "@/types";

interface ILayoutProps {
  children: React.ReactNode;
  onDownload: () => void;
  onReadFile: (file: File) => void;
  onInput: (text: string) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  result: string;
  textInput: string;
  setResult: (text: string) => void;
}

const Layout = ({
  children,
  onDownload,
  onReadFile,
  textInput,
  onInput,
  onEncrypt,
  onDecrypt,
  result,
  setResult,
}: ILayoutProps) => {
  const [formatOpt, setFormatOpt] = useState<FO.FormatOptionValType>(
    FO.FORMAT_OPTIONS.NO_SPACES
  );

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      onReadFile(file);
    }
  };

  const onChangeRadioFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormatOpt(val as FO.FormatOptionValType);
    setResult(
      TextProcessor.format(result, val as FO.FormatOptionValType)
    )
  }

  return (
    <div className="layout">
      <div>{children}</div>
      <div>
        <input type="file" onChange={handleUploadFile} />
        <div>
          <textarea
            name="text-input"
            value={textInput}
            onChange={(e) => onInput(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.resultContainer}>{result}</div>
      <div>
        {Object.keys(FO.FORMAT_OPTIONS).map((key) => {
          const val = FO.FORMAT_OPTIONS[key as FO.FormatOptionKeyType];
          return (
            <label key={key}>
              <input
                type="radio"
                name="format"
                value={val}
                checked={formatOpt === val}
                onChange={onChangeRadioFormat}
              />
              {val}
            </label>
          );
        })}
      </div>
      <div className={styles.cipherBtns}>
        <button onClick={onEncrypt}>Encrypt</button>
        <button onClick={onDecrypt}>Decrypt</button>
        <button onClick={onDownload}>Download</button>
      </div>
    </div>
  );
};

export default Layout;
