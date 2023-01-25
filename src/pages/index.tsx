import Link from "next/link";

// a) Vigenere Cipher standard (26 huruf alfabet)
// b) Varian Vigenere Cipher (26 huruf alfabet): Auto-key Vigenere Cipher
// c) Extended Vigenere Cipher (256 karakter ASCII)
// d) Affine Cipher
// e) Playfair Cipher (26 huruf alfabet)
// f) Hill Cipher

const Home = () => {
  return (
    <div>
      <Link href="/vigenere-cipher">
        <a>Vigenere Cipher</a>
      </Link>
      <Link href="/varian-vigenere-cipher">
        <a>Varian Vigenere Cipher</a>
      </Link>
      <Link href="/extended-vigenere-cipher">
        <a>Extended Vigenere Cipher</a>
      </Link>
      <Link href="/affine-cipher">
        <a>Affine Cipher</a>
      </Link>
      <Link href="/playfair-cipher">
        <a>Playfair Cipher</a>
      </Link>
      <Link href="/hill-cipher">
        <a>Hill Cipher</a>
      </Link>
    </div>
  );
};

export default Home;
