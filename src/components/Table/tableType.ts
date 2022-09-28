interface Data {
  userName: String;
  avatar: String;
  email: String;
  name: String;
  joinedAt: String;
  lastLogin: String;
  transactions: String;
  status: String;
  bio: String;
  user: String;
  id: String;
}

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof Data;
  label: String;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: keyof Data;
  rowCount: number;
}


export type { Data, Order, HeadCell, EnhancedTableProps }