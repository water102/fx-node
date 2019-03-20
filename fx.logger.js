class FxLogger {
  constructor() {
    this.logLevel = 'info';
  }

  fixConsole() {
    let w = window;
    if (w.console)
      return;
    let f = () => { };
    w.console = {
      info: f,
      profile: f,
      assert: f,
      msIsIndependentlyComposed: function () {
        return true;
      },
      clear: f,
      dir: f,
      warn: f,
      error: f,
      log: f,
      profileEnd: f,
      count: f,
      groupEnd: f,
      time: f,
      timeEnd: f,
      trace: f,
      group: f,
      dirxml: f,
      debug: f,
      groupCollapsed: f,
      select: f
    };
  }

  logLevelMapping(val) {
    let lLv = (val || '1').toString();
    switch (lLv) {
      case '5':
        lLv = 'trace';
        break;
      case '4':
        lLv = 'debug';
        break;
      case '3':
        lLv = 'info';
        break;
      case '2':
        lLv = 'warn';
        break;
      case '1':
        lLv = 'fatal';
        break;
    }
    return lLv;
  }

  setLevel(lv) {
    this.logLevel = lv;
  }

  getLevel() {
    return this.logLevel;
  }

  trace(...arg) {
    if (this === undefined
      || this.logLevel === 'trace')
      console.log(arg.length === 1 ?
        arg[0] :
        arg);
  }
  debug(...arg) {
    if (this === undefined
      || this.logLevel === 'trace'
      || this.logLevel === 'debug')
      console.log(arg.length === 1 ?
        arg[0] :
        arg);
  }

  info(...arg) {
    if (this === undefined
      || this.logLevel === 'trace'
      || this.logLevel === 'debug'
      || this.logLevel === 'info')
      console.info(arg.length === 1 ?
        arg[0] :
        arg);
  }

  warn(...arg) {
    if (this === undefined
      || this.logLevel === 'trace'
      || this.logLevel === 'debug'
      || this.logLevel === 'info'
      || this.logLevel === 'warn')
      console.warn(arg.length === 1 ?
        arg[0] :
        arg);
  }

  error(...arg) {
    if (this === undefined
      || this.logLevel === 'trace'
      || this.logLevel === 'debug'
      || this.logLevel === 'info'
      || this.logLevel === 'warn'
      || this.logLevel === 'error')
      console.error(arg.length === 1 ?
        arg[0] :
        arg);
  }

  fatal(...arg) {
    if (this === undefined
      || this.logLevel === 'trace'
      || this.logLevel === 'debug'
      || this.logLevel === 'info'
      || this.logLevel === 'warn'
      || this.logLevel === 'fatal')
      console.error(arg.length === 1 ?
        arg[0] :
        arg);
  }
}
module.exports = new FxLogger();