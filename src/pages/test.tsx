import React, { useState } from "react";
import { FileExtractorSrv } from "@/services";

const TestPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  }

  const handleRead = async () => {
    if (!file) {
      return;
    }

    const text = await FileExtractorSrv.readTxtFile(file);
    setText(text as string);
  }

  const handleDownload = () => {
    if (!text) {
      return;
    }

    if (!FileExtractorSrv.download(text, "myFile.txt")) {
      alert("Download failed");
    }
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
