console.log("halo");

function encrypt(data: string): string {
  const thisa = 17;
  const thisb = 20;

  let cipher = "";
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    console.log(char);
    if (char != " ") {
      const charCode = char.charCodeAt(0) - "A".charCodeAt(0);
      console.log(charCode);
      const cipherCharCode = (thisa * charCode + thisb) % 26;
      console.log(cipherCharCode);
      const cipherChar = String.fromCharCode(
        cipherCharCode + "A".charCodeAt(0)
      );
      console.log(cipherChar);
      cipher += cipherChar;
    } else {
      cipher += " ";
    }
    console.log(cipher + "\n========================");
  }

  return cipher;
}

encrypt("AFFINE CIPHER");

export {};
