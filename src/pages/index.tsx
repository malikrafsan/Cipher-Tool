import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/vigenere-cipher">
        <div>Vigenere Cipher</div>
      </Link>
      <Link href="/auto-key-vigenere-cipher">
        <div>Auto-key Vigenere Cipher</div>
      </Link>
      <Link href="/extended-vigenere-cipher">
        <div>Extended Vigenere Cipher</div>
      </Link>
      <Link href="/affine-cipher">
        <div>Affine Cipher</div>
      </Link>
      <Link href="/playfair-cipher">
        <div>Playfair Cipher</div>
      </Link>
      <Link href="/hill-cipher">
        <div>Hill Cipher</div>
      </Link>
    </div>
  );
};

export default Home;
