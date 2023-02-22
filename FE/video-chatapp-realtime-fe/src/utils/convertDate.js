export const convertDate = (dateInput, format) => {
  const date = new Date(dateInput);
  const map = {
    ss: date.getSeconds(),
    min: date.getMinutes(),
    hh: date.getHours(),
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/ss|min|hh|mm|dd|yy|yyy/gi, (matched) => map[matched]);
};
