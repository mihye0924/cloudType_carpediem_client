import { DrawerProps } from "@/types/common";
import { ChevronLeft } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const CDrawer = React.memo((props: DrawerProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={props.open}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={props.onClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      {props.children}
    </Drawer>
  );
});
export default CDrawer;
