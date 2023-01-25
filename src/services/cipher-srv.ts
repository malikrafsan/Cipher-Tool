interface ICipherSrv {
    encrypt(data: string): string;
    decrypt(data: string): string;
}

export default ICipherSrv;
