import AppBar from "@/components/editPage/appbar";
import Map from "@/components/editPage/map";
import PinContainer from "@/components/editPage/pinContainer";

import { useState, useEffect } from "react";

export default function EditPage() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const routeID = url.searchParams.get("routeId");
    APIRouteInfo({ routeID: routeID });
  }, []);

  function APIRouteInfo({ routeID }) {
    fetch(`/api/v1/route/getRouteInfo?route_id=${routeID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRouteInfo(data);
      });
  }

  const [routeInfo, setRouteInfo] = useState({
    userNickName: "박현주",
    routeDistance: 372,
    routeDuration: 275,
    routeDate: "2021-10-10",
    photo_url: "https://tinyurl.com/45fcyj22",
    memo: "귀여운 고양이가 있어요",
    points: [],
    pins: [],
  });
  const [currentPoint, setCurrentPoint] = useState(0);
  const [currentPinInd, setCurrentPinInd] = useState(0);
  const [kakaoMap, setKakaoMap] = useState(null);

  // useEffect(() => {
  //   console.log("currentPinInd", currentPinInd);
  // }, [currentPinInd]);

  function onPointChange(e) {
    setCurrentPoint(e.target.value);

    //지도 이동
    kakaoMap.panTo(
      new kakao.maps.LatLng(
        routeInfo.points[e.target.value].lat,
        routeInfo.points[e.target.value].lon
      )
    );

    //가장 가까운 핀으로 이동

    let leftNearestPinInd = e.target.value;
    for (; leftNearestPinInd >= 0; leftNearestPinInd--) {
      let currentPinIndIndex = routeInfo.pins.findIndex(
        (pin) => pin.point_id === routeInfo.points[leftNearestPinInd].point_id
      );
      if (currentPinIndIndex !== -1) {
        leftNearestPinInd = currentPinIndIndex;
        break;
      }
    }

    setCurrentPinInd(leftNearestPinInd);
  }

  return (
    <div className="container">
      <AppBar routeInfo={routeInfo} />
      <PinContainer
        onPointChange={onPointChange}
        currentPinInd={currentPinInd}
        currentPoint={currentPoint}
        pointLength={routeInfo.points.length}
        pins={routeInfo.pins}
      />
      <Map
        points={routeInfo.points}
        pins={routeInfo.pins}
        kakaoMap={kakaoMap}
        setKakaoMap={setKakaoMap}
      />
      <style jsx>{`
        .container {
        }
      `}</style>
    </div>
  );
}
