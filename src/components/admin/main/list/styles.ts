import { styled } from "@mui/material";

export const Section = styled("section")(() => ({
  padding: "0 10px",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
}));
export const SelectBoxWrap = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  margin: "20px 0",
};
export const SelectBox = {
  lineHeight: 1,
  boxSizing: "border-box",
  ".MuiSelect-select": {
    padding: "10px 20px",
    fontSize: "14px",
  },
};
export const TableList = {
  borderCollapse: "collapse !important",
  th: {
    backgroundColor: "#2d4b97",
    padding: "10px 10px",
    color: "#fff",
    ">span": {
      color: "#fff",
    },
    ".Mui-checked svg": {
      color: "#fff",
    },
  },
  td: {
    border: "1px solid #f1f1f1",
    padding: 0,
  },
};
