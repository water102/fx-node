class FxTest {
  constructor() {
    this.listNo = [];
  }
  add(no) {
    this.listNo.push(no);
  }
  print() {
    console.log('aaa', this.listNo);
  }
}
module.exports = new FxTest();