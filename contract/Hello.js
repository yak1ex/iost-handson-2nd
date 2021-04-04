class Hello {
  init() {
    storage.put("msg", "hello");
  }
  /**
   * 
   * @param {string} data 
   * @returns {boolean}
   */
  can_update(data) {
    this._onlyOwner();
    return true;
  }
  /**
   * 
   * @returns {string}
   */
  hello() {
    const msg = storage.get("msg");
    return `${msg}, ${tx.publisher}!`;
  }
  /**
   * 
   * @param {string} msg 
   */
  changeMsg(msg) {
    // this._onlyOwner();
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