import styles from "./index.module.css";


const Input = (props: {
  encryptionKey: string;
  onChangeEncryptionKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
  msg: string;
  onChangeMsg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  result: string;
}) => {
  const {
    encryptionKey,
    onChangeEncryptionKey,
    msg,
    onChangeMsg,
    onEncrypt,
    onDecrypt,
    result,
  } = props;

  return (
    <div>
      <div className={styles.input}>
        <input
          type="text"
          name="encryption-key"
          placeholder="encryption key"
          value={encryptionKey}
          onChange={onChangeEncryptionKey}
        />
        <input
          type="text"
          name="msg"
          placeholder="message"
          value={msg}
          onChange={onChangeMsg}
        />
      </div>
      <div className={styles.btnGroup}>
        <button onClick={onEncrypt}>Encrypt</button>
        <button onClick={onDecrypt}>Decrypt</button>
      </div>
      {result && (
        <div className={styles.result}>
          <h1>Result</h1>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
