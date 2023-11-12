import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EndWalkModal({
  ifModalOn,
  duration,
  distance,
  pinNum,
  routeId,
}) {
  const renderMap = useRef(false);
  const [kakaoMap, setKakaoMap] = useState(null);

  //// 지도 관련

  useEffect(() => {
    if (!kakaoMap) return;
  }, [kakaoMap]);

  //지도 띄우기
  useEffect(() => {
    if (renderMap.current) return;
    renderMap.current = true;

    loadMap();
  }, []);

  //// 루트 관련
  const [routeInfo, setRouteInfo] = useState({
    // userNickName: String,
    // routeDistance: number,
    // routeDuration: number,
    // routeDate: date,
    // photo_url: String,
    // memo: String,
    points: [
      {
        point_id: 1,
        lat: 35.88492799369972,
        lon: 128.61019603467486,
      },

      {
        point_id: 2,
        lat: 35.884924365159144,
        lon: 128.60979454710966,
      },

      {
        point_id: 3,
        lat: 35.884929707128016,
        lon: 128.60939600947307,
      },

      {
        point_id: 4,
        lat: 35.88463436741945,
        lon: 128.60941217938537,
      },

      {
        point_id: 5,
        lat: 35.88437273706037,
        lon: 128.60943456813223,
      },

      {
        point_id: 6,
        lat: 35.883965516874404,
        lon: 128.60956197558485,
      },

      {
        point_id: 7,
        lat: 35.883592276200986,
        lon: 128.60950736000288,
      },
    ],
  });

  useEffect(() => {
    if (kakaoMap === null) return;
    if (routeInfo === null) return;
    drawPath({ points: routeInfo.points });
  }, [kakaoMap, routeInfo]);

  function drawPath({ points }) {
    const linePath = points.map((point) => {
      return new kakao.maps.LatLng(point.lat, point.lon);
    });

    // 한눈에 보기
    var bounds = new kakao.maps.LatLngBounds();
    for (var i = 0; i < linePath.length; i++) {
      bounds.extend(linePath[i]);
    }
    kakaoMap.setBounds(bounds);

    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#000000", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    polyline.setMap(kakaoMap);
  }

  function loadMap() {
    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}`;
    document.head.appendChild(mapScript);
    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("resultMap");
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(35.885494, 128.613824), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        setKakaoMap(new window.kakao.maps.Map(container, options));
      });
    };
  }

  return (
    <div className="container">
      <div className="modalBox">
        <img
          className="mapBox"
          src="https://firebasestorage.googleapis.com/v0/b/alk-d8004.appspot.com/o/images%2F2b6e3236-30bf-4cee-9572-ca8037c79355.png?alt=media&token=f629d75f-5487-4a3e-8628-2da3b5282ad8"
        ></img>

        <div className="infoBox">
          <div className="contentBox">
            <Image
              src="/icons/navbar_icons/walk.svg"
              width={11.25}
              height={18}
            />
            {distance}m
          </div>
          <div
            style={{ height: 23.33, width: 1.11, backgroundColor: "#F5F5F5" }}
          />
          <div className="contentBox">
            <Image src="/icons/walk/clock.svg" width={13.5} height={13.5} />
            {duration}
          </div>
          <div
            style={{ height: 23.33, width: 1.11, backgroundColor: "#F5F5F5" }}
          />
          <div className="contentBox">
            <Image src="/icons/pin/flag.svg" width={11.2} height={14} />
            {pinNum}
          </div>
        </div>
        <button
          className="saveButton"
          onClick={() => {
            location.href = `/editPage/editPage?routeId=${routeId}`;
          }}
        >
          지금 등록할게요
        </button>
        <div
          className="notNowButton"
          onClick={() => {
            location.href = `/homePage/homePage`;
          }}
        >
          나중에 등록할게요
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 5;

          display: ${ifModalOn ? "block" : "none"};
        }

        .modalBox {
          position: fixed;
          top: 264px;
          left: 50%;
          transform: translateX(-50%);

          background: #ffffff;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 326.83px;
          height: 350px;

          border-radius: 13.33px;
        }

        .mapBox {
          width: 326.83px;
          height: 168.69px;

          border-radius: 13.33px 13.33px 0px 0px;
        }

        .infoBox {
          width: 279px;
          height: 23.33px;

          margin-top: 26.67px;

          display: flex;
          justify-content: space-between;
        }

        .infoBox .contentBox {
          width: 69.25px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          color: #777;
          font-size: 13px;
          font-weight: 600;
        }

        .saveButton {
          width: 283px;
          height: 53px;

          margin-top: 20px;

          background: #000000;

          color: #ffffff;
          font-size: 13.333px;
          font-weight: 700;

          border-radius: 4.44px;
        }

        .notNowButton {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 55.56px;
          width: 283px;

          color: #000;
          font-size: 13.333px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
