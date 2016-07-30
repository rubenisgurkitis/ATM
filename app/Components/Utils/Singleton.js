let instance = null;

// Singleton to track through all the components if a card is inserted and a
// the pin code introduced is correct
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
