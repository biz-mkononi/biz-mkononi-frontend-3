import {formatMoney} from './FormatMoney';

interface Column {
  header: string;
  dataKey: string;
}
const isISODate = (dateStr: string) => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr);
};
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
// eslint-disable-next-line
export const renderCell = (row: any, column: Column) => {
  const keys = column.dataKey.split('.');
  let value = row;
  for (const key of keys) {
    value = value[key];
  }

  if (column.dataKey === 'gender') {
    value = value.toLowerCase();
  }
  if (
    column.dataKey === 'amount' ||
    column.dataKey === 'amountCharged' ||
    column.dataKey === 'amountPaid'
  ) {
    value = formatMoney(value);
  }

  if (typeof value === 'string' && isISODate(value)) {
    const formattedDate = new Date(value).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }
  return value;
};
