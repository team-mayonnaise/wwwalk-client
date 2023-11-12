import { on } from "events";
import { useEffect, useState, useRef } from "react";

export default function Map() {
  ////루트
  const [routeInfo, setRouteInfo] = useState(dummy.result);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [currentPinInd, setCurrentPinInd] = useState(0);
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

    let rightNearestPinInd = e.target.value;
    for (; rightNearestPinInd < routeInfo.points.length; rightNearestPinInd++) {
      let currentPinIndIndex = routeInfo.pins.findIndex(
        (pin) => pin.point_id === routeInfo.points[rightNearestPinInd].point_id
      );
      if (currentPinIndIndex !== -1) {
        rightNearestPinInd = currentPinIndIndex;
        break;
      }

      if (rightNearestPinInd == routeInfo.points.length - 1) {
        rightNearestPinInd = -1;
        break;
      }
    }

    if (leftNearestPinInd === -1) setCurrentPinInd(rightNearestPinInd);
    else if (rightNearestPinInd === -1) setCurrentPinInd(leftNearestPinInd);
    else if (
      Math.abs(leftNearestPinInd - e.target.value) <
      Math.abs(rightNearestPinInd - e.target.value)
    ) {
      setCurrentPinInd(leftNearestPinInd);
    } else {
      setCurrentPinInd(rightNearestPinInd);
    }
  }

  useEffect(() => {
    onPinChange(currentPinInd);
  }, [currentPinInd]);

  function onPinChange(pinInd) {
    document.querySelector(".pinContainer").scrollTo({
      //한 element 높이
      top: 100 * pinInd,
      behavior: "smooth",
    });
  }

  function drawPath() {
    const linePath = routeInfo.points.map((point) => {
      return new kakao.maps.LatLng(point.lat, point.lon);
    });

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 1, // 선의 두께 입니다
      strokeColor: "#000000", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(kakaoMap);
  }

  //// 지도 관련
  const renderMap = useRef(false);
  const [kakaoMap, setKakaoMap] = useState(null);

  useEffect(() => {
    if (!kakaoMap) return;
    drawPath();
  }, [kakaoMap]);

  //지도 띄우기
  useEffect(() => {
    if (renderMap.current) return;
    renderMap.current = true;

    loadMap();
  }, []);
  function loadMap() {
    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&autoload=false`;
    document.head.appendChild(mapScript);
    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(35.8852186, 128.6146397), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        setKakaoMap(new window.kakao.maps.Map(container, options));
      });
    };
  }

  return (
    <div className="container">
      <div id="map" />
      <input
        type="range"
        className="pointSelector"
        min="0"
        max={routeInfo.points.length - 1}
        value={currentPoint}
        onChange={onPointChange}
      />
      <div className="pinContainer">
        {routeInfo.pins.map((pinInfo) => (
          <PinElement pinInfo={pinInfo} key={pinInfo.pinId} />
        ))}
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          min-height: 100vh;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pointSelector {
          width: 50vw;
        }

        .pinContainer {
          width: 50vw;
          height: 50vh;
          overflow-x: hidden;
          overflow-y: scroll;
        }

        #map {
          width: 50vw;
          height: 50vh;

           {
            /* filter: grayscale(100%); */
          }
        }
      `}</style>
    </div>
  );
}

const dummy = {
  result: {
    route_id: "testid",
    route_name: "testname",
    points: [
      {
        point_id: 0,
        lon: 128.6146397,
        lat: 35.8852186,
      },
      {
        point_id: 1,
        lon: 128.6136397,
        lat: 35.8852186,
      },
      {
        point_id: 2,
        lon: 128.6126397,
        lat: 35.8852186,
      },
      {
        point_id: 3,
        lon: 128.6146397,
        lat: 35.8842186,
      },
      {
        point_id: 4,
        lon: 128.6146397,
        lat: 35.8832186,
      },
      {
        point_id: 5,
        lon: 128.6146397,
        lat: 35.8822186,
      },
    ],

    pins: [
      {
        point_id: 1,
        pinId: 0,
        photo_url:
          "https://i.namu.wiki/i/6K-GeuqvIx8u4jyGQqiCHC85h7-h3q-bzXvaGEfvcedTcceXnezG_K-L9epg1OBplQoNDZIgGE1t8s7ci814Aw.webp",
        memo: "hello world",
      },
      {
        point_id: 4,
        pinId: 1,
        photo_url:
          "https://i.namu.wiki/i/6K-GeuqvIx8u4jyGQqiCHC85h7-h3q-bzXvaGEfvcedTcceXnezG_K-L9epg1OBplQoNDZIgGE1t8s7ci814Aw.webp",
        memo: "hello world",
      },
    ],

    distance: 10,
    duration: 10,
  },
};

function PinElement({ pinInfo }) {
  return (
    <div className="container">
      <img src={pinInfo.photo_url} />
      <p>{pinInfo.memo}</p>
      <style jsx>{`
        .container {
          border: 1px solid black;
          margin-bottom: 1rem;
        }
        img {
          width: 25vw;
        }
      `}</style>
    </div>
  );
}
