import { Order, Data } from './tableType'

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  else return -1

}


export function getComparator(order: Order, orderBy: keyof Data): (a: Data, b: Data) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((item, index) => [item, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((item) => item[0]);
}
