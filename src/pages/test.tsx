import React, { useState } from "react";

const TestPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  }

  const handleRead = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setText(text as string);
    };
    reader.readAsText(file);
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.style.display = "none";
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div>
      <h1>Test Page</h1>
      <div>
        <input type="file" onChange={handleUploadFile}  />
      </div>
      <div>
        <button onClick={handleRead}>
          Read
        </button>
      </div>
      <div>
        <p>
          {text}
        </p>
      </div>
      <div>
        <button onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  )
}

export default TestPage;
