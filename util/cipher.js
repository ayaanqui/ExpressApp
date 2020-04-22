module.exports = class Cipher {
  constructor(input, a) {
    this.startChar = ".";

    this.input = input;
    (a === 0) ? this.a = 200 : this.a = a;
    this.b = 3 * this.a + (this.a * this.a);
  }

  quadraticSolver(a, b, c) {
    var topFraction = (-1 * b) + Math.sqrt((b * b) - (4 * a * (-1 * c)));
    var bottomFraction = 2 * a;
    return topFraction / bottomFraction;
  }

  quadraticGenerator(a, b, charVal) {
    return (a * (charVal * charVal)) + (b * charVal);
  }

  jumbledCharVal(encryptedCharVal) {
    var strEncryptedCharVal = encryptedCharVal + "";
    var encryptedCharVals = strEncryptedCharVal.split("");

    var convertedCharVal = "A";
    var convertedCharString = "";

    var val = 65;

    for (var i = 0; i < encryptedCharVals.length; i++) {
      encryptedCharVals[i] % 2 === 0 ? val = 97 : val = 65;
      convertedCharVal = String.fromCharCode(parseInt(encryptedCharVals[i]) + val);
      convertedCharString += convertedCharVal;
    }
    return convertedCharString;
  }

  encrypt() {
    var characters = this.input.split("");
    var charVal, encryptedCharVal = 0;
    var encryptedInput = "";

    for (var i = 0; i < characters.length; i++) {
      charVal = characters[i].charCodeAt();
      encryptedCharVal = this.quadraticGenerator(this.a, this.b, charVal);
      encryptedInput += this.jumbledCharVal(encryptedCharVal);
      (i !== characters.length - 1) ? encryptedInput += this.startChar : null;
    }
    return encryptedInput;
  }

  parseJumbledLetters(jumbledLetters) {
    var jumbledLettersArr = jumbledLetters.split("");
    var jumbledLetterCharVal, unjumbledLetterCharVal = 0;
    var unjumbledString = "";
    var val = 97;

    for (var i = 0; i < jumbledLettersArr.length; i++) {
      jumbledLetterCharVal = jumbledLettersArr[i].charCodeAt();
      (jumbledLetterCharVal % 2 === 0) ? val = 65 : val = 97;
      unjumbledLetterCharVal = jumbledLetterCharVal - val;
      unjumbledString += unjumbledLetterCharVal;
    }
    return unjumbledString;
  }

  decrypt() {
    var characters = this.input.split(".");
    var decryptedOutput = "";
    var unjumbledString = "";

    for (var i = 0; i < characters.length; i++) {
      unjumbledString = this.parseJumbledLetters(characters[i] + "");
      decryptedOutput += String.fromCodePoint(parseInt(this.quadraticSolver(this.a, this.b, parseInt(unjumbledString))));
    }
    return decryptedOutput;
  }
}