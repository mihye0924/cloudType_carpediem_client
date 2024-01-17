import CMainHeader from "@/components/user/main/CMainHeader"
import CMain from '@/components/user/main/CMain'
import CMainImageList from '@/components/user/main/CMainImageList'
import CMainFooter from '@/components/user/main/CMainFooter'
import {  useEffect, useState } from "react"
import CLoading from "@/components/user/CLoading" 
const ProtectedPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {   
    setIsLoading(false)
  },[])
  return (
    <>
    {
      !isLoading ? 
      <>
        <CMainHeader />
        <CMain />
        <CMainImageList />
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

export default ProtectedPage