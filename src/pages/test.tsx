import { ExtendedVigenereCipherSrv, FileExtractorSrv } from "@/services";
import { useState } from "react";

const TestPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    console.log(file.type)

    const callback = (file) => {
      const newFile = file;
      return (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = new Uint8Array(e.target.result as ArrayBuffer);
        // convert uint8array to string
        const str = new TextDecoder("utf-8").decode(arrayBuffer);
        // setContent(str);
        console.log(str);

        const cipher = new ExtendedVigenereCipherSrv("MALIK");
        const result = cipher.encrypt(str);
        // console.log(result);

        const result2 = cipher.decrypt(result);
        console.log(result2);

        // convert string to uint8array and file / blob
        const uint8array = new TextEncoder().encode(result2);
        const blob = new Blob([uint8array], { type: newFile.type });
        const file = new File([blob], newFile.name, { type: newFile.type });

        FileExtractorSrv.downloadFile(file, newFile.name);

        if (result2 === str) {
          console.log("OK");
        }
      };
    }

    reader.onload = callback(file);

    reader.readAsArrayBuffer(file);
  };



  return (
    <div>
      <h1>Test Page</h1>
      <div>
        <input type="file" onChange={handleUploadFile} />
      </div>
      <div>
        {file && (
          <div>
            <div>File name: {file.name}</div>
            <div>
              File content:
            </div>
            <div>
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
