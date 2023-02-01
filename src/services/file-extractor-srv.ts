class FileExtractorSrv {
  static async readTxtFile(file: File) {
    if (file.type !== "text/plain") {
      throw new Error("File type is not supported");
    }

    const fileReader = new FileReader();
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsText(file);
    });
  }

  static download(data: string, filename: string): boolean {
    if (!document) {
      return false;
    }

    const element = document.createElement("a");
    const file = new Blob([data], {
      type: "text/plain",
    });
    element.style.display = "none";
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return true;
  }
}

export default FileExtractorSrv;
