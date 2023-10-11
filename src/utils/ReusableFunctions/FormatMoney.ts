export function formatMoney(number: string) {
  const numberStr = number.toString();
  const parts = numberStr.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedNumber =
    parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
  return formattedNumber;
}
