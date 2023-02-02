import styles from "./index.module.css";

interface ILayoutProps {
  children: React.ReactNode;
  onDownload: () => void;
  onReadFile: (file: File) => void;
  onInput: (text: string) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  result: string;
  textInput: string;
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
}: ILayoutProps) => {
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      onReadFile(file);
    }
  };

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
      <div className={styles.cipherBtns}>
        <button onClick={onEncrypt}>Encrypt</button>
        <button onClick={onDecrypt}>Decrypt</button>
        <button onClick={onDownload}>Download</button>
      </div>
    </div>
  );
};

export default Layout;
