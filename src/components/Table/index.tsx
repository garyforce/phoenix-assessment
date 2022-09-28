import React, { useState, useEffect, useCallback, Key, useMemo } from "react";
import moment, { MomentInput } from "moment";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  UserInfo,
  StatusComponent,
  TransactionComponent,
  EnhancedTableHead,
} from "./Table.component";
import { Data, Order } from "./tableType";
import { getComparator, stableSort } from "./functions";

export default function EnhancedTable() {
  const [tableData, setTableData] = useState<Array<Data>>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      setTableData(data);
    };
    fetchTableData();
  }, []);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("user");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = useMemo(
    () =>
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0,
    [page, rowsPerPage, tableData]
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.id as Key}>
                      <TableCell
                        component="th"
                        id={`enhanced-table-checkbox-${index}`}
                        scope="row"
                        padding="normal"
                        align="left"
                        style={{ minWidth: "250px" }}
                      >
                        <UserInfo
                          userAvatar={row.avatar}
                          userName={row.userName}
                          userEmail={row.email}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell
                        align="left"
                        style={{ backgroundColor: "#EEEEEE" }}
                      >
                        {moment(row.joinedAt as MomentInput).format(
                          "MM/DD/YYYY"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.lastLogin as MomentInput).format(
                          "MM/DD/YYYY HH:mm:ss"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <TransactionComponent />
                      </TableCell>
                      <TableCell align="left">
                        <StatusComponent status={row.status as string} />
                      </TableCell>
                      <TableCell align="left">{row.bio}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
