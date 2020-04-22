module.exports = class Cipher {
  constructor(input) {
    this.startChar = ".";

    this.input = input;
    this.a = 789902;
    this.b = 3 * this.a + (this.a * this.a);
  }

  quadraticSolver(a, b, c) {
    const topFraction = (-1 * b) + Math.sqrt((b * b) - (4 * a * (-1 * c)));
    const bottomFraction = 2 * a;
    return topFraction / bottomFraction;
  }

  parseJumbledLetters(jumbledLetters) {
    const jumbledLettersArr = jumbledLetters.split("");
    let unjumbledString = "";

    jumbledLettersArr.map(jumbledLetter => {
      const letterAscii = jumbledLetter.charCodeAt();
      const val = (letterAscii % 2 === 0) ? 65 : 97;

      let unjumbledLetterCharVal = letterAscii - val;

      unjumbledString += unjumbledLetterCharVal;
    });
    return parseInt(unjumbledString);
  }

  decrypt() {
    const characters = this.input.split(".");
    var decryptedOutput = "";

    characters.map(character => {
      const parsedAsciiLetter = this.parseJumbledLetters(character);
      decryptedOutput += String.fromCodePoint(parseInt(this.quadraticSolver(this.a, this.b, parsedAsciiLetter)));
    });
    return decryptedOutput;
  }
}