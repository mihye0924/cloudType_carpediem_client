import { ChevronLeft } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';  
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] ;
  open: boolean
  onClose?: () => void
} 


const CDrawer = React.memo((props: Props) => { 

  return(
  <Drawer 
    variant="persistent"
    anchor="right"
    open={props.open}   
    sx={{ 
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
    }}
  >
  <DrawerHeader>
    <IconButton onClick={props.onClose}>
        <ChevronLeft /> 
    </IconButton>
  </DrawerHeader>
    {props.children}
  </Drawer>
  )
})
export default CDrawer;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
