export default function shortDate() {
  const dateObj = new Date();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const date = ('0' + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();
  const shortDate = year + '-' + month + '-' + date;
  return shortDate;
}
