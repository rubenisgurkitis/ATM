let instance = null;

export default class Singleton {
  constructor(cardInserted = false, pinCorrect = false) {
    if (!instance) {
      instance = this;
    }
    this.cardInserted = cardInserted;
    this.pinCorrect = pinCorrect;
    return instance;
  }
  setCardInserted(isInserted) {
    this.cardInserted = isInserted;
    if (!isInserted) {
      this.pinCorrect = false;
    }
  }

  setPinCorrect(isCorrect) {
    this.pinCorrect = isCorrect;
  }
}
