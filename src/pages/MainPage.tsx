import CMainHeader from "@/components/user/main/CMainHeader"
import CMain from '@/components/user/main/CMain'
import CMainImageList from '@/components/user/main/CMainImageList'
import CMainFooter from '@/components/user/main/CMainFooter'
import { useCallback, useEffect, useState } from "react"
import CLoading from "@/components/user/CLoading" 
import axios from "axios"
import { useLocation } from "react-router"   
import { profileData, profileType } from "@/type/mainType"


const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);  
  const path = useLocation().pathname.split('/')[1];  
  const [profile, setProfile] = useState<profileType>(profileData); 
  const [list, setList] = useState<[]>([]);

  // 프로필 데이터 가져오기
  const getProfileImgData = useCallback(async() => {
    await axios({
      method: 'get', 
      url: `${import.meta.env.VITE_BACK_URL}/list/profile/${path}`
    })
    .then(( res ) => { 
      if(res.data.code === 200) {    
        setProfile(res.data.result[0]);
      }
    })
    .catch((err) => console.log(err))
  },[path])


  // 리스트 가져오기
  const getListData = useCallback(async() => {
    await axios({
     method: 'get', 
     url: `${import.meta.env.VITE_BACK_URL}/list/${path}`
   })
   .then(( res ) => {  
     if(res.data.code === 200) {   
       setList(res.data.result); 
     }
   })
   .catch((err) => console.log(err))
 },[path])


  useEffect(() => {  
    getProfileImgData()
    getListData()   
    setIsLoading(false) 
  },[getListData, getProfileImgData, isLoading])

  return (
    <>
    {
      !isLoading ? 
      <>
        <CMainHeader />
        <CMain 
          list={list} 
          profile={profile} 
          />
        <CMainImageList 
          profile={profile} 
          list={list} 
        />
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