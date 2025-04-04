import AHeader from "@/components/admin/header";
import AMainList from "@/components/admin/main/list/index";
import CLoading from "@/components/user/CLoading";
import { useEffect, useState } from "react";

const AdminMainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <AHeader />
          <AMainList />
        </>
      ) : (
        <CLoading />
      )}
    </>
  );
};

export default AdminMainPage;
