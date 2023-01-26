import styles from "./index.module.css";

type InputHandler = {
  name: string;
  placeholder: string;
  inputVal: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputProps = {
  inputHandlers: InputHandler[];
  msg: string;
  onChangeMsg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  result: string;
}

const Input = (props: InputProps) => {
  const {
    inputHandlers,
    msg,
    onChangeMsg,
    onEncrypt,
    onDecrypt,
    result,
  } = props;

  return (
    <div>
      <div className={styles.inputs}>
        {
          inputHandlers.map((inputHandler) => {
            return (
              <input
                key={inputHandler.name}
                type="text"
                name={inputHandler.name}
                placeholder={inputHandler.placeholder}
                value={inputHandler.inputVal}
                onChange={inputHandler.onChangeInput}
              />
            );
          })
        }
      </div>
      <div>
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
