import React from "react";
import { EnhancedTableProps, Data, HeadCell } from "./tableType";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

export function UserInfo({
  userAvatar,
  userName,
  userEmail,
}: {
  userAvatar: String;
  userName: String;
  userEmail: String;
}) {
  return (
    <div className="flex">
      {/* <img
        className="w-[50px] h-[50px] mr-2 rounded-md outline-none"
        src={userAvatar}
      ></img> */}
      <div className="w-[50px] h-[50px] mr-3 rounded-md outline-none bg-slate-200 "></div>
      <div className="flex flex-col justify-between pt-1 pb-1">
        <div className="user-name">{userName}</div>
        <div className="user-email">{userEmail}</div>
      </div>
    </div>
  );
}

export function StatusComponent({ status }: { status: String }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 pr-5 ">
      <div className="status-text">{status}</div>
      <div
        className={`${
          status === "Active" ? "bg-green-500" : "bg-red-500"
        } status-icon h-[10px] w-[10px] rounded-full`}
      ></div>
    </div>
  );
}

export function TransactionComponent() {
  return (
    <div className="transaction-component">
      <div style={{ color: "red" }}>{"-$220,00"}</div>
      <div style={{ color: "green" }}>{"$500,00"}</div>
    </div>
  );
}

const headCells: readonly HeadCell[] = [
  {
    id: "user",
    label: "User",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "joinedAt",
    label: "Joined On",
  },
  {
    id: "lastLogin",
    label: "Last Login",
  },
  {
    id: "transactions",
    label: "Transactions/Balance",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "bio",
    label: "Bio",
  },
];

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id == "user" || headCell.id =='transactions' ? (
              <TableSortLabel hideSortIcon={true}>
                {headCell.label}
              </TableSortLabel>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
