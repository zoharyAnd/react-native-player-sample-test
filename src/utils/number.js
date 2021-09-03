export const getNumberUnit = (num) => {
  // const units = ["M","B","T","Q","QT","S"]
  // const unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
  // const r = unit%3
  // const x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
  // return x.toFixed(1)+ ' ' + units[Math.floor(unit / 3) - 2]

  // Nine Zeroes for Billions
  return Math.abs(Number(num)) >= 1.0e+9

  ? (Math.abs(Number(num)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(num)) >= 1.0e+6

  ? (Math.abs(Number(num)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(num)) >= 1.0e+3

  ? (Math.abs(Number(num)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(num));
}