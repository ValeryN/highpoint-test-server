/**
 * Returns ISO 8601 string representation of date.
 * @apram {Date} date
 * @param {boolean=} opt_verbose Whether the verbose format should be used
 *     instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included
 *     in the string.
 * @return {string} ISO 8601 string representation of date.
 */
exports.dateToIsoString = function(date, opt_verbose, opt_tz) {
  var str = [
    date.getFullYear(),
    padNumber(date.getMonth() + 1, 2),
    padNumber(date.getDate(), 2)
  ];

  return str.join((opt_verbose) ? '-' : '') +
         (opt_tz ? getTimezoneOffsetString(date) : '');
};

/**
 * Returns ISO 8601 string representation of date/time.
 * @apram {Date} date
 * @param {boolean=} opt_verbose Whether the verbose format should be used
 *     instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included
 *     in the string.
 * @return {string} ISO 8601 string representation of date/time.
 * @override
 */
exports.dateTimeToIsoString = function(date, opt_verbose, opt_tz) {
  var dateString = exports.dateToIsoString(date, opt_verbose);

  if (opt_verbose) {
    return dateString + ' ' +
        padNumber(date.getHours(), 2) + ':' +
        padNumber(date.getMinutes(), 2) + ':' +
        padNumber(date.getSeconds(), 2) +
        (opt_tz ? getTimezoneOffsetString(date) : '');
  }

  return dateString + 'T' +
      padNumber(date.getHours(), 2) +
      padNumber(date.getMinutes(), 2) +
      padNumber(date.getSeconds(), 2) +
      (opt_tz ? getTimezoneOffsetString(date) : '');
};

/**
 * Returns timezone offset as a string. Returns offset in [+-]HH:mm format or Z
 * for UTC.
 * @apram {Date} date
 * @return {string} The timezone offset as a string.
 */
var getTimezoneOffsetString = function(date) {
  var tz;
  var offset = date.getTimezoneOffset();

  if (offset == 0) {
    tz = 'Z';
  } else {
    var n = Math.abs(offset) / 60;
    var h = Math.floor(n);
    var m = (n - h) * 60;
    tz = (offset > 0 ? '-' : '+') +
        padNumber(h, 2) + ':' +
        padNumber(m, 2);
  }

  return tz;
};


/**
 * Repeats a string n times.
 * @param {string} string The string to repeat.
 * @param {number} length The number of times to repeat.
 * @return {string} A string containing {@code length} repetitions of
 *     {@code string}.
 */
var repeat = function(string, length) {
  return new Array(length + 1).join(string);
};


/**
 * Pads number to given length and optionally rounds it to a given precision.
 * For example:
 * <pre>padNumber(1.25, 2, 3) -> '01.250'
 * padNumber(1.25, 2) -> '01.25'
 * padNumber(1.25, 2, 1) -> '01.3'
 * padNumber(1.25, 0) -> '1.25'</pre>
 *
 * @param {number} num The number to pad.
 * @param {number} length The desired length.
 * @param {number=} opt_precision The desired precision.
 * @return {string} {@code num} as a string with the given options.
 */
var padNumber = function(num, length, opt_precision) {
  var s = undefined === opt_precision ? String(num) : num.toFixed(opt_precision);
  var index = s.indexOf('.');
  if (index == -1) {
    index = s.length;
  }
  return repeat('0', Math.max(0, length - index)) + s;
};
