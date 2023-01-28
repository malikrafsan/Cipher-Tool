import ICipherSrv from "./cipher-srv";

class PlayFairCipher implements ICipherSrv {
  private key: string;
  private readonly OFFSET = "A".charCodeAt(0);

  constructor(key: string) {
    this.key = key;
  }

  findCharacter(huruf: string, square: string[][]): number[] {
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            if(square[i][j] === huruf) {
                return [i, j]
            }
        }
    }
  }

  createBujurSangkar(): string[][] {
    let dict = {};
    for (let i = 0; i < this.key.length; i++) {
        if (this.key[i] < 'A' || this.key[i] > 'Z' || this.key[i] === 'J' || this.key[i] in dict)
        {
            this.key = this.key.substring(0, i) + this.key.substring(i + 1);
            i--;
        } else {
            dict[this.key[i]] = 1
        }
    }

    let index = 0;
    while(this.key.length != 25) {
        let huruf = String.fromCharCode(this.OFFSET + index);
        if(huruf !== "J") {
            if(!this.key.includes(huruf)) {
                this.key = this.key.concat(huruf)
            }     
        }
        index += 1
    }

    let square = [];
    for (let i = 0; i < 5; i++) {
        let tempSquare = [];
        for(let j = 0; j < 5; j++) {
            tempSquare.push(this.key[i * 5 + j])
        }
        square.push(tempSquare);
    }

    return square;
  }

  encrypt(data: string): string {
    for (let i = 0; i < data.length; i++) {
        if (data[i] < 'A' || data[i] > 'Z') {
            data = data.substring(0, i) + data.substring(i + 1);
            i--;
        }
    }
    data = data.replace("J", "I");

    let pasangan = [];
    let square = this.createBujurSangkar();
    let index = 0;

    index = 0;
    while(index < data.length) {
        if(index != data.length - 1) {
            if(data[index] != data[index + 1]) {
                pasangan.push(data[index] + data[index + 1]);
                index += 2;
            } else {
                pasangan.push(data[index] + "X");
                index += 1;
            }
        } else {
            pasangan.push(data[index] + "X");
            index += 1;
        }
    }

    console.log(square)

    let hasilCipher = "";
  
    for (let i = 0; i < pasangan.length; i++) {
        let huruf1 = this.findCharacter(pasangan[i][0],square);
        let huruf2 = this.findCharacter(pasangan[i][1],square);

        if(huruf1[1] === huruf2[1]) {
            hasilCipher += square[huruf1[0] + 1 % 5][huruf1[1]] + square[huruf2[0] + 1 % 5][huruf2[1]]
        } else if (huruf1[0] === huruf2[0]) {
            hasilCipher += square[huruf1[0]][huruf1[1] + 1 % 5] + square[huruf2[0]][huruf2[1] + 1 % 5]
        } else {
            hasilCipher += square[huruf1[0]][huruf2[1]] + square[huruf2[0]][huruf1[1]]
        }
    }

    return hasilCipher;
  }

  decrypt(data: string): string {
    for (let i = 0; i < data.length; i++) {
        if (data[i] < 'A' || data[i] > 'Z') {
            data = data.substring(0, i) + data.substring(i + 1);
            i--;
        }
    }

    let pasangan = [];
    let square = this.createBujurSangkar();
    let index = 0;

    index = 0;
    while(index < data.length) {
        pasangan.push(data[index] + data[index + 1]);
        index += 2;
    }

    let hasilDekrip = "";
  
    for (let i = 0; i < pasangan.length; i++) {
        let huruf1 = this.findCharacter(pasangan[i][0],square);
        let huruf2 = this.findCharacter(pasangan[i][1],square);
        console.log(pasangan[i])
        console.log(huruf1, huruf2)
        if(huruf1[1] === huruf2[1]) {
            hasilDekrip += square[huruf1[0] - 1 % 5][huruf1[1]] + square[huruf2[0] - 1 % 5][huruf2[1]]
        } else if (huruf1[0] === huruf2[0]) {
            hasilDekrip += square[huruf1[0]][huruf1[1] - 1 % 5] + square[huruf2[0]][huruf2[1] - 1 % 5]
        } else {
            hasilDekrip += square[huruf1[0]][huruf2[1]] + square[huruf2[0]][huruf1[1]];
        }
        hasilDekrip = hasilDekrip.replace("X", "");
    }

    return hasilDekrip;
  }
}

export default PlayFairCipher;
