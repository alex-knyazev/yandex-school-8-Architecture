class Model {
  /**
   * @param {object} data 
   * @param {function} updateStoreByActions 
   */
  constructor() {
    this.inputValue = '';
  }

  getInputValue() {
    return this.inputValue;
  }

  setInputValue(value) {
    return this.inputValue = value;
  }

}

export {
  Model
}