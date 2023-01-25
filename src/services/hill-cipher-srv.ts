import ICipherSrv from "./cipher-srv";

class HillCipherSrv implements ICipherSrv {
  private readonly SIZE_MATRIX = 3;
  private readonly OFFSET = 65;

  private key: string;
  private keyMatrix: number[][];

  constructor(key: string) {
    this.key = key;
    this.keyMatrix = this.initKeyMatrix(this.key);
  }

  private initKeyMatrix(key: string): number[][] {
    return new Array(this.SIZE_MATRIX).fill({}).map((_, idxOuter) =>
      new Array(this.SIZE_MATRIX).fill({}).map((_, idxInner) => {
        const char = key[idxOuter * this.SIZE_MATRIX + idxInner];
        return char.charCodeAt(0) - this.OFFSET;
      })
    );
  }

  private buildMsgVector(msg: string): number[][] {
    return new Array(this.SIZE_MATRIX).fill({}).map((_, idx) => {
      const char = msg[idx];
      return [char.charCodeAt(0) - this.OFFSET];
    });
  }

  private calcCipherMatrix(keyMatrix: number[][], msgVector: number[][]) {
    const cipherMatrix = new Array(this.SIZE_MATRIX).fill({}).map(() => {
      return new Array(this.SIZE_MATRIX).fill({}).map(() => 0);
    });

    for (let i = 0; i < this.SIZE_MATRIX; i++) {
      for (let j = 0; j < 1; j++) {
        for (let k = 0; k < this.SIZE_MATRIX; k++) {
          cipherMatrix[i][j] += keyMatrix[i][k] * msgVector[k][j];
        }
        cipherMatrix[i][j] = cipherMatrix[i][j] % 26;
      }
    }

    return cipherMatrix;
  }

  private convertCipherMatrixToText(cipherMatrix: number[][]): string {
    return cipherMatrix
      .map((row) => {
        return String.fromCharCode(row[0] + this.OFFSET);
      })
      .join("");
  }

  encrypt(data: string): string {
    const msgVector = this.buildMsgVector(data);
    const cipherMatrix = this.calcCipherMatrix(this.keyMatrix, msgVector);

    return this.convertCipherMatrixToText(cipherMatrix);
  }
  decrypt(data: string): string {
    return data;
  }
}

export default HillCipherSrv;
