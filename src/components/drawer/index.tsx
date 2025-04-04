import React from "react";
import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "@/components/drawer/styles";
import { DrawerProps } from "@/components/drawer/types";

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
