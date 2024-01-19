import CMainHeader from "@/components/user/main/CMainHeader"
import CMain from '@/components/user/main/CMain'
import CMainImageList from '@/components/user/main/CMainImageList'
import CMainFooter from '@/components/user/main/CMainFooter'
import { useCallback, useEffect, useState } from "react"
import CLoading from "@/components/user/CLoading" 
import axios from "axios"
import { useLocation } from "react-router"


const MainPage = () => {
  const [list, setList] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);  
  const path = useLocation().pathname.split('/')[1];
  

  // 리스트 가져오기
  const getListData = useCallback(async() => {
    await axios({
     method: 'get', 
     url: `${import.meta.env.VITE_BACK_URL}/list/${path}`
   })
   .then(( res ) => {  
     if(res.data.code === 200) {   
       setList(res.data.result);
       console.log(res.data.result,"dfsdfd")
     }else{
       setList([])
     }
   })
   .catch((err) => console.log(err))
 },[path])


  useEffect(() => {  
    getListData()   
    setIsLoading(false) 
  },[getListData, isLoading])

  return (
    <>
    {
      !isLoading ? 
      <>
        <CMainHeader />
        <CMain />
        <CMainImageList list={list} />
        <CMainFooter />
      </>
      :
      <>
        <CLoading />
      </>
    }
    </>
  )
}

export default MainPage