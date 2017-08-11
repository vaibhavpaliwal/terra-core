import moment from 'moment';

class DateTimeUtil {

  // Converts an ISO 8601 date into a moment object. If the date is invalid and unable to convert, the originally provided date is returned.
  static createSafeDate(date) {
    const momentDate = moment(date);
    return momentDate.isValid() ? momentDate : null;
  }

  // Filters out any invalid dates in the provided list of dates and returns a list of moment objects representation of the valid dates
  static filterInvalidDates(dates) {
    const momentDates = [];

    if (dates) {
      let index = 0;
      for (index = 0; index < dates.length; index += 1) {
        const momentDate = moment(dates[index]);
        if (momentDate.isValid()) {
          momentDates.push(momentDate);
        }
      }
    }

    return momentDates.length > 0 ? momentDates : dates;
  }

  // Converts date string to the ISO8601 format with only the date part. If the date string is invalid and unable to convert, the originally provided string is returned.
  static convertToISO8601(date, format) {
    if (date && format) {
      const momentDate = moment(date, format, true);
      return momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : date;
    }

    return date;
  }

  static formatMomentDateTime(momentDate, format) {
    return momentDate.isValid() ? momentDate.format(format) : '';
  }

  static formatISODateTime(iSODate, format) {
    const momentDate = moment(iSODate);
    return DateTimeUtil.formatMomentDateTime(momentDate, format);
  }

  static updateDate(momentDate, iSODate) {
    const newDate = momentDate.clone();
    const date = moment(iSODate);

    return newDate.year(date.get('year')).month(date.get('month')).date(date.get('date'));
  }

  static updateTime(momentDate, time) {
    const newDate = momentDate.clone();
    const date = moment(time, 'HH:mm', true);

    return newDate.hour(date.get('hour')).minute(date.get('minute'));
  }

  static checkAmbiguousTime(momentDate) {
    const newDate = momentDate.clone();
    newDate.add(1, 'hour');

    return newDate.format('YYYY-MM-DDTHH:mm:ss') === momentDate.format('YYYY-MM-DDTHH:mm:ss');
  }
}

export default DateTimeUtil;
