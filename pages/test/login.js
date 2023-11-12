import { useEffect, useRef } from "react";

export default function LogIn() {
  const ifLoaded = useRef(false);

  function login() {
    location.href =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${process.env.KAKAO_REST_API_KEY}` +
      `&redirect_uri=${process.env.WWWALk_CLIENT_BASE_URL}/test/login` +
      `&response_type=code`;
  }

  useEffect(() => {
    //api 두번 호출 방지
    if (ifLoaded.current) return;
    ifLoaded.current = true;

    //url에서 code 추출
    const url = new URL(location.href);
    const code = url.searchParams.get("code");

    if (code) {
      getKakaoAccessToken(code)
        .then((kakaoAccessToken) => getKakaoUserInfo(kakaoAccessToken))
        .then((kakaoUserInfo) => trySignIn(kakaoUserInfo));
    }
  }, []);

  async function getKakaoAccessToken(code) {
    return fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body:
        "grant_type=authorization_code" +
        `&client_id=${process.env.KAKAO_REST_API_KEY}` +
        `&redirect_uri=${process.env.WWWALk_CLIENT_BASE_URL}/test/login` +
        `&code=${code}`,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.access_token;
      });
  }

  async function getKakaoUserInfo(kakaoAccessToken) {
    return fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + kakaoAccessToken,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      query: {
        property_keys: ["kakao_account.email"],
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return {
          userId: res.id,
          userName: res.properties.nickname,
          photo_Url: res.properties.profile_image,
        };
      });
  }

  async function trySignIn(userInfo) {
    fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userInfo),
    }).then((res) => {
      if (res.status === 200) {
        alert("로그인 성공");
      } else {
        alert("로그인 실패");
      }
    });
  }

  return (
    <div className="container">
      <button onClick={login}>로그인</button>
      <style jsx>{`
        .container {
        }
      `}</style>
    </div>
  );
}
