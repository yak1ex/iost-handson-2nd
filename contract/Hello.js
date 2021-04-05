class Hello {
  init() {
    storage.put("msg", "hello");
  }
  /**
   * if this function returns true, you can update smart contract
   * @param {string} data 
   * @returns {boolean}
   */
  can_update(data) {
    this._onlyOwner();
    return true;
  }
  /**
   * returns hello message
   * @returns {string}
   */
  hello() {
    return `${msg}, ${tx.publisher}!`;
  }
  /**
   * change hello message
   * @param {string} msg 
   */
  changeMsg(msg) {
    this._onlyOwner();
    storage.put("msg", msg);
  }
  _onlyOwner() {
    const owner = blockchain.contractOwner();
    if (!blockchain.requireAuth(owner, "active")) {
      throw new Error("only owner");
    }
  }
}
module.exports = Hello;