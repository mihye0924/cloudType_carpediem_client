import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import JoinPage from "@/pages/JoinPage";
import MainPage from "@/pages/MainPage";
import AdminMainPage from "@/pages/admin/AdminMainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import CLoginId from "@/components/user/login/CLoginId";
import CLoginPw from "@/components/user/login/CLoginPw";
import AccountPage from "@/pages/AccountPage";
import Auth from "./Auth";

const Router = () => {
  const AuthAdminMainPage = Auth(AdminMainPage, true, true);
  const AuthAccountPage = Auth(AccountPage, true);
  const AuthMainPage = Auth(MainPage, null);

  return (
    <Routes>
      <Route path="/:id" element={<AuthMainPage />} />
      <Route path="/:id/:list_no" element={<AuthMainPage />} />
      <Route path="/:id/account" element={<AuthAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/id" Component={CLoginId} />
      <Route path="/login/pw" Component={CLoginPw} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/notFound" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* 어드민 페이지 */}
      <Route path="/admin" element={<AuthAdminMainPage />} />
    </Routes>
  );
};

export default Router;
