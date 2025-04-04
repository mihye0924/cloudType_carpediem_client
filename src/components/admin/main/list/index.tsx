import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CButton from "@/components/button";
import {
  Section,
  SelectBoxWrap,
  SelectBox,
  TableList,
} from "@/components/admin/main/list/styles";
import { ChangeEvent, useState } from "react";
import { columns, rows } from "@/data/main-list";

const AMainList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [option1, setOption1] = useState("활성화");
  const [option2, setOption2] = useState("삭제하기");

  return (
    <Section>
      <Box sx={SelectBoxWrap}>
        <CButton type="blue" style={{ height: "40px" }}>
          인증배지
        </CButton>
        <FormControl sx={SelectBox}>
          <Select
            value={option1}
            onChange={(event: SelectChangeEvent) =>
              setOption1(event.target.value)
            }
            displayEmpty
            inputProps={{ "aria-label": `${option1}` }}
          >
            <MenuItem value="활성화">활성화</MenuItem>
            <MenuItem value="비활성화">비활성화</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={SelectBox}>
          <Select
            value={option2}
            onChange={(event: SelectChangeEvent) =>
              setOption2(event.target.value)
            }
            displayEmpty
            inputProps={{ "aria-label": `${option2}` }}
          >
            <MenuItem value="삭제하기">삭제하기</MenuItem>
            <MenuItem value="수정하기">수정하기</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "100vh" }}>
          <Table sx={TableList} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.custom ? (
                        <Checkbox disableRipple color="primary" />
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, id) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.custom ? (
                              <Checkbox
                                disableRipple
                                color="primary"
                                checked={row.check}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, 150]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Section>
  );
};

export default AMainList;
