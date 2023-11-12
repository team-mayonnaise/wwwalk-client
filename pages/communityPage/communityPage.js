import AppBar from "@/components/communityPage/appbar";
import BoardComponent from "@/components/communityPage/boardComponent";
import CommentModal from "@/components/communityPage/commentModal";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const [routes, setRoutes] = useState([]);

  const [ifCommentModalOn, setIfCommentModalOn] = useState(false);
  const [curComments, setCurComments] = useState([]);

  function APIGetComments({ routeId }) {
    fetch(`/api/v1/route/comment?route_id=${routeId}`)
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 400:
            alert("잘못된 요청입니다.");
            break;
          case 500:
            alert("서버 오류입니다.");
            break;
        }
      })
      .then((res) => {
        console.log(res);
        setCurComments(res);
      });
  }

  useEffect(() => {
    if (curComments.length > 0) setIfCommentModalOn(true);
  }, [curComments]);

  useEffect(() => {
    APIgetAllRoutes();
  }, []);

  function APIgetAllRoutes() {
    fetch("/api/v1/route/getAllRouteInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 400:
            alert("잘못된 요청입니다.");
            break;
          case 500:
            alert("서버 오류입니다.");
            break;
        }
      })
      .then((res) => {
        console.log(res);
        setRoutes(res);
      });
  }

  return (
    <div className="container">
      <CommentModal
        ifModalOn={ifCommentModalOn}
        setIfModalOn={setIfCommentModalOn}
        curComments={curComments}
      />

      <AppBar />
      {routes.map((route) => {
        return <BoardComponent route={route} APIGetComments={APIGetComments} />;
      })}
      <style jsx>{`
        .container {
        }
      `}</style>
    </div>
  );
}
