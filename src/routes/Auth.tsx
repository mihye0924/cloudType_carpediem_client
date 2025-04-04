import { JSX } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/userState";
import { useEffect } from "react";

// SpecificComponent: 감싸질 컴포넌트
// option:
// - null: 아무나 출입이 가능한 페이지
// - true: 로그인한 유저만 출입이 가능한 페이지
// - false: 로그인한 유저는 출입 불가능한 페이지
// adminRoute:
// - true: admin 유저만 들어갈 수 있는 곳이면 true
// - null: 아니면 null

function Auth(
  SpecificComponent: () => JSX.Element,
  option: null | boolean,
  adminRoute: null | boolean = null
) {
  function AuthenticationCheck() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const path = useLocation().pathname.split("/");

    useEffect(() => {
      // 로그인한 안한 상태
      if (!user.isAuth) {
        if (option) {
          alert("로그인 후 이용 가능한 페이지 입니다.");
          return navigate("/login");
        }
        // 로그인 한 상태
      } else {
        // 관리자 : 1, 사용자: 0
        if (adminRoute && user.role === 0) {
          alert("관리자만 이용 가능한 페이지입니다.");
          return navigate("/");
        } else {
          if (option === false) {
            return navigate("/");
          }
          if (option === null || option === true) {
            if (path[2] === "account") {
              if (path[1] !== user.user_id) {
                alert("로그인 후 이용 가능한 페이지 입니다.");
                return navigate("/login");
              }
            }
          }
        }
      }
    }, [navigate, path, user]);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}

export default Auth;
