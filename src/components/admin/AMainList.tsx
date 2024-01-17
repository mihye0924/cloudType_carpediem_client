import { Box, Checkbox, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import CButton from '../CButton';

interface Column {
  id: 'num' | 'check' | 'userId' | 'userPw' | 'userName' | 'userBirth' | 'userPhone' | 'userEmail';
  label: string;
  minWidth?: number;
  align?: 'center' | 'right' | 'left';
  custom?: boolean 
}

interface Data {
  num: number,
  check: boolean,
  userId: string,
  userPw: string,
  userName: string,
  userBirth: string,
  userPhone: string,
  userEmail: string
}

function createData(
  num: number,
  check: boolean,
  userId: string,
  userPw: string,
  userName: string,
  userBirth: string,
  userPhone: string,
  userEmail: string,
  ): Data {
    return { num, check, userId, userPw, userName, userBirth, userPhone, userEmail }
  }

const AMainList = () => { 
  // 테이블 페이지 네이션
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const columns: readonly Column[] = [
    { 
      id: 'num', 
      label: '번호', 
      minWidth: 60,
      align: 'center', 
    }, 
    {
      id: 'check', 
      label: '체크', 
      align: 'center',
      custom: true 
    },
    {
      id: 'userId', 
      label: '아이디', 
      minWidth: 100,
      align: 'center', 
    },
    {
      id: 'userPw',
      label: '비밀번호',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'userName',
      label: '이름',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'userBirth',
      label: '생년월일',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'userPhone',
      label: '전화번호',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'userEmail',
      label: '이메일',
      minWidth: 170,
      align: 'center',
    },
  ]; 
  const rows = [
    createData(1, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(2, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(3, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(4, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(5, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(6, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(7, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
    createData(8, false ,'mihye0924','1234','조미혜','1997.09.24','01047755749','474968@naver.com'),
  ]; 

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  // 옵션
  const [option1, setOption1] = useState('활성화');
  const [option2, setOption2] = useState('삭제하기'); 
  
  return (
    <Section>
      <Box sx={SelectBoxWrap}>
        <CButton type="blue" style={{ height: '40px' }}>인증배지</CButton>
        <FormControl sx={SelectBox}>
          <Select 
            value={option1}
            onChange={(event: SelectChangeEvent) => setOption1(event.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': `${option1}` }}
          >   
            <MenuItem value="활성화">활성화</MenuItem>
            <MenuItem value="비활성화">비활성화</MenuItem> 
          </Select>  
        </FormControl> 
        <FormControl sx={SelectBox}> 
          <Select
            value={option2}
            onChange={(event: SelectChangeEvent) => setOption2(event.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': `${option2}` }}
          >   
            <MenuItem value="삭제하기">삭제하기</MenuItem>
            <MenuItem value="수정하기">수정하기</MenuItem> 
          </Select> 
        </FormControl> 
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '100vh' }}>
          <Table sx={TableList} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return(
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {
                      column.custom ?
                      <Checkbox
                      disableRipple
                      color="primary"   
                      /> 
                      : 
                      column.label
                    }
                  </TableCell>
                )})}
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
                            {
                              column.custom ?
                              <Checkbox
                                disableRipple
                                color="primary" 
                                checked={row.check} 
                              /> 
                              : value
                            }
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
  )
}
 
export default AMainList

const Section = styled('section')(() => ({
  padding: '0 10px',
  width: '100%',
  maxWidth:'975px', 
  margin: '0 auto', 
})) 
const SelectBoxWrap = {
  display:'flex',
  justifyContent: 'flex-end', 
  gap: '10px', 
  margin: '20px 0'
}
const SelectBox = { 
  lineHeight: 1,
  boxSizing: 'border-box', 
  '.MuiSelect-select': { 
    padding: '10px 20px',
    fontSize: '14px'
  }
}
const TableList = { 
  borderCollapse: 'collapse !important', 
  'th': {
    backgroundColor: '#2d4b97',
    padding: '10px 10px',
    color:'#fff',
    '>span':{
      color: '#fff'
    },
    '.Mui-checked svg': {
      color: '#fff'
    }
  },
  'td': {
    border: '1px solid #f1f1f1',
    padding: 0,
  }
}