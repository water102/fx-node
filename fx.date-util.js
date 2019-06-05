class FxDateUtil {
  getCurrentDateTimeUtc() {
    const now = new Date();
    const nowUtc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    return nowUtc;
  }

  getCurrentDateUtc() {
    const now = new Date();
    const nowUtc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    return nowUtc;
  }

  getUnixTimestamp(date) {
    return (date.getTime() / 1000) | 0;
  }

  getTimestamp(date) {
    return date.getTime();
  }

  getDateFromTimestamp(unix_timestamp) {
    const date = new Date(unix_timestamp * 1000);
    return date;
  }

  addDays(date, days) {
    const dateObj = new Date();
    dateObj.setDate(date.getDate() + days);
    return dateObj;
  }

  addHours(date, hours) {
    const dateObj = new Date();
    dateObj.setHours(date.getDate() + hours);
    return dateObj;
  }

  addMinutes(date, minutes) {
    const dateObj = new Date();
    dateObj.setMinutes(date.getDate() + minutes);
    return dateObj;
  }
}

module.exports = new FxDateUtil();
