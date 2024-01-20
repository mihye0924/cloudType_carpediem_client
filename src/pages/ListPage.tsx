import CModal from "@/components/CModal";
import CLoading from "@/components/user/CLoading";  
import CMainThumb from "@/components/user/main/CMainThumb";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ListPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);  //로딩
  const navigate = useNavigate()
  const path = useLocation().pathname.split('/')[1];  
  
  useEffect(() => {    
    setIsLoading(false) 
  },[])
 
  return (
    <>
    {
      !isLoading ?
      <CModal
        style={modalStyle}
        icon="prev"
        title="게시물" 
        open={true}
        onPrev={() => navigate(`/${path}`)}
      >  
        <CMainThumb />  
      </CModal>
      :  
      <CLoading /> 
    }
    </>
  )
}

export default ListPage

const modalStyle = { 
  '&.MuiBox-root': {
    backgroundColor: '#fff', 
    'section': { 
      '&:last-of-type': {
        overflowY: 'auto',
        alignItems: 'flex-start', 
        '&::-webkit-scrollbar':{
          width: '0',
          backgroundColor: '#f1f1f1'
        }
      }
    }
  },
}