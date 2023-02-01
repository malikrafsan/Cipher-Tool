interface ICipherSrv {
    encrypt(data: string): string | Promise<string>;
    decrypt(data: string): string | Promise<string>;
}

export default ICipherSrv;
