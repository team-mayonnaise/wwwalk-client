import {
  getCurrentPostion,
  getDistanceBetweenCoor,
} from "@/public/functions/location";
import { useEffect, useRef, useState } from "react";
import FloatingButton from "./floatingButton";
import Image from "next/image";
import CameraButton from "./cameraButton";
import SavePinModal from "./savePinModal";
import EndWalkModal from "./endWalkModal";

export default function Map() {
  const [mode, setMode] = useState(1); // 1 : 산책 전, 2 : 산책 중
  useEffect(() => {}, [mode]);

  function APIstartWalk() {
    fetch("/api/v1/route/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
          return setMode(2);
        case 400:
          throw new Error("잘못된 요청입니다.");
        case 500:
          throw new Error("서버 오류입니다.");
      }
    });
  }
  function APIpoint({ callback }) {
    fetch("/api/v1/route/addpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
          callback({ lat: currentLocation.lat, lon: currentLocation.lon });
          return;
        case 400:
          throw new Error("잘못된 요청입니다.");
        case 500:
          throw new Error("서버 오류입니다.");
      }
    });
  }
  function APIendWalk() {
    fetch("/api/v1/route/end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        setIfEndWalkModalOn(true);
        setRouteId(body.route_id);
      });
  }

  function APIaddPin() {
    APIpoint({
      callback: ({ lat, lon }) => {
        fetch("/api/v1/route/addpin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            lon: lon,
            lat: lat,
            photo_url: imageURL,
            memo: memo,
            address: "대구광역시 동구 신천동 158-5",
            address_name: "투썸 플레이스",
          }),
        }).then((res) => {
          switch (res.status) {
            case 200:
              setPinNum(pinNum + 1);
              setIfSavePinModalOn(false);
              return;
            case 400:
              throw new Error("잘못된 요청입니다.");
            case 500:
              throw new Error("서버 오류입니다.");
          }
        });
      },
    });
  }

  const renderMap = useRef(false);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [distance, setDistance] = useState(0); // 산책 거리
  const [startTime, setStartTime] = useState(null); // 산책 시작 시간 [Date
  const [duration, setDuration] = useState(""); // 산책 시간
  const [currentPoint, setCurrentPoint] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [memo, setMemo] = useState("");
  const [pinNum, setPinNum] = useState(0);
  const [routeId, setRouteId] = useState(null);

  function getCurrentAddress({ lat, lon }) {
    if (kakaoMap === null) return;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lon, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].address.address_name);
        setCurrentAddress(result[0].address.address_name);
      }
    });
  }

  useEffect(() => {
    if (!currentPoint) return;
  }, [currentPoint]);

  function startWalk() {
    setDistance(0);
    setStartTime(new Date().getTime());
    setCurrentPoint(currentLocation);
    APIstartWalk();

    getCurrentLocation();
    setInterval(() => {
      getCurrentLocation();
    }, 10000);
  }
  useEffect(() => {
    if (startTime == null) return;
    setInterval(() => {
      if (ifEndWalkModalOn) return;
      const sec = Math.round((new Date().getTime() - startTime) / 1000);
      if (sec >= 60)
        setDuration(Math.round(sec / 60) + "분 " + (sec % 60) + "초");
      else setDuration(sec + "초");
    }, 1000);
  }, [startTime]);

  useEffect(() => {
    if (!currentLocation) return;
    if (!currentPoint) return;
    if (
      currentLocation.lat == currentPoint.lat &&
      currentLocation.lon == currentPoint.lon
    )
      return;

    const dis = getDistanceBetweenCoor(
      currentLocation.lat,
      currentLocation.lon,
      currentPoint.lat,
      currentPoint.lon
    );
    setDistance(distance + dis);
    drawLine({ before: currentPoint, cur: currentLocation });
    setCurrentPoint(currentLocation);
    APIpoint();
  }, [currentLocation]);

  ////전역
  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    getCurrentAddress(currentLocation);
  }, [currentLocation]);

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

  function loadMap() {
    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`;
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

  //// 핀관련
  const [pins, setPins] = useState([
    { pinId: "0", lon: 128.61382440584043, lat: 35.88549431313776 },
    { pinId: "1", lon: 128.61357380484327, lat: 35.88569593117377 },
    { pinId: "2", lon: 128.61294029961223, lat: 35.886127977017736 },
    { pinId: "3", lon: 128.6122782530134, lat: 35.88624500438695 },
    { pinId: "4", lon: 128.61169150798764, lat: 35.88625288087432 },
    { pinId: "5", lon: 128.61087191370774, lat: 35.886245855568056 },
  ]);
  const [pinMarkers, setPinMarkers] = useState([]);

  //핀 띄우기
  useEffect(() => {
    if (!kakaoMap) return;
    var newPinMarkers = [];
    pins.forEach((pin) => {
      newPinMarkers.push(renderNewPin({ lat: pin.lat, lon: pin.lon }));
    });
    setPinMarkers(newPinMarkers);
  }, [pins, kakaoMap]);

  function renderNewPin({ lat, lon }) {
    const content = customPinContent({});
    const position = new window.kakao.maps.LatLng(lat, lon);

    var customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      clickable: false,
    });
    customMarker.setMap(kakaoMap);
    return customMarker;
  }

  ////핀 클릭을 위한 지도 클릭 이벤트

  //현재 클릭한 위치
  const [curClickedLocation, setCurClickedLocation] = useState();
  useEffect(() => {
    if (kakaoMap) {
      kakao.maps.event.addListener(kakaoMap, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;
        setCurClickedLocation({
          lat: latlng.Ma,
          lon: latlng.La,
        });
      });
    }
  }, [kakaoMap]);

  //선택된 핀
  const [selectedPinInd, setSelectedPinInd] = useState(null);
  useEffect(() => {
    if (!curClickedLocation) return;
    const pinInd = searchForClickedPin();
    if (selectedPinInd !== null) renderPin({ pinInd: selectedPinInd });
    if (pinInd == null || pinInd == selectedPinInd) {
      setSelectedPinInd(null);
      return;
    }
    setSelectedPinInd(pinInd);
    renderSelectedPin({ pinInd: pinInd });
  }, [curClickedLocation]);

  function searchForClickedPin() {
    const nearlestDis = pins
      .map((val, ind) => {
        return {
          dis: getDistanceBetweenCoor(
            val.lat,
            val.lon,
            curClickedLocation.lat,
            curClickedLocation.lon
          ),
          ind: ind,
        };
      })
      .sort((a, b) => a.dis - b.dis)[0];
    if (nearlestDis !== undefined && nearlestDis.dis < 50) {
      return nearlestDis.ind;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (selectedPinInd === null) return;
  }, [selectedPinInd]);

  //선택된 핀의 루트
  const [selectedPinRouteInfo, setSelectedPinRouteInfo] = useState({
    // userNickName: String,
    // routeDistance: number,
    // routeDuration: number,
    // routeDate: date,
    // photo_url: String,
    // memo: String,
    points: [],
  });
  const [selectedPinRoutePath, setSelectedPinRoutePath] = useState([]);

  useEffect(() => {
    if (kakaoMap === null) return;
    if (selectedPinInd === null) {
      if (selectedPinRoutePath !== null) {
        erasePath();
        setSelectedPinRoutePath(null);
      }
      return;
    }
    setSelectedPinRoutePath(drawPath({ points: selectedPinRouteInfo.points }));
  }, [kakaoMap, selectedPinRouteInfo, selectedPinInd]);

  function drawPath({ points }) {
    let curColor = 200;
    const unit = (curColor - 0) / (points.length - 2);
    let pointBefore = new kakao.maps.LatLng(points[0].lat, points[0].lon);
    var newLinePath = [];
    points.slice(1).forEach((point) => {
      const hexColor = curColor.toString(16);
      const linePath = [
        pointBefore,
        new kakao.maps.LatLng(point.lat, point.lon),
      ];

      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#" + hexColor + hexColor + hexColor, // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      polyline.setMap(kakaoMap);
      newLinePath.push(polyline);

      curColor -= unit;
      pointBefore = new kakao.maps.LatLng(point.lat, point.lon);
    });

    return newLinePath;
  }
  function drawLine({ before, cur }) {
    const linePath = [
      new kakao.maps.LatLng(before.lat, before.lon),
      new kakao.maps.LatLng(cur.lat, cur.lon),
    ];

    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FF327C", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    polyline.setMap(kakaoMap);
  }
  function erasePath() {
    selectedPinRoutePath.forEach((path) => {
      path.setMap(null);
    });
  }

  //// 현재위치 관련
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  //현재위치 가져오기
  function getCurrentLocation() {
    getCurrentPostion(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log(latitude, longitude);
        setCurrentLocation({ lat: latitude, lon: longitude });
        getCurrentAddress({ lat: latitude, lon: longitude });
        return { lat: latitude, lon: longitude };
      },
      (error) => {
        alert(error);
      }
    );
  }

  //현재위치 띄우기
  useEffect(() => {
    if (!kakaoMap) return;
    if (!currentLocation) return;

    renderCurrentLocation();
    setMapToCurrentLocation();
  }, [currentLocation, kakaoMap]);

  function renderCurrentLocation() {
    if (currentLocationMarker) currentLocationMarker.setMap(null);

    var content;
    switch (mode) {
      case 1:
        content = currentLocationMarkerContent({
          imgSrc: "/icons/pin/myLocation2.svg",
          width: 70,
          height: 105,
          offset: -26,
        });
        break;
      case 2:
        content = currentLocationMarkerContent({
          imgSrc: "/icons/pin/myLocation3.svg",
          width: 52,
          height: 52,
          offset: 0,
        });
        break;
    }
    const position = new window.kakao.maps.LatLng(
      currentLocation.lat,
      currentLocation.lon
    );

    const customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      clickable: false,
    });
    customMarker.setMap(kakaoMap);

    setCurrentLocationMarker(customMarker);
  }

  function setMapToCurrentLocation() {
    kakaoMap.panTo(
      new kakao.maps.LatLng(currentLocation.lat, currentLocation.lon)
    );
  }

  const [imageFile, setImageFile] = useState(null);
  const [ifSavePinModalOn, setIfSavePinModalOn] = useState(false);
  const [ifEndWalkModalOn, setIfEndWalkModalOn] = useState(false);

  return (
    <div id="map">
      <div
        className="backButton"
        onClick={() => {
          window.history.back();
        }}
      >
        <img src="/icons/pin/back.svg" />
      </div>
      <div className="currentLocationButton" onClick={getCurrentLocation}>
        <img src="/icons/pin/toCurLocation.svg" />
      </div>

      {mode === 1 ? (
        <FloatingButton
          ifBlack={true}
          onClick={startWalk}
          iconSrc="/icons/walk/walk.svg"
          iconWidth={9.75}
          iconHeight={15.6}
          content="산책 시작하기"
        />
      ) : null}
      {mode === 2 ? (
        <>
          <CameraButton
            imageFile={imageFile}
            setImageFile={setImageFile}
            setIfModalOn={setIfSavePinModalOn}
          />
          <SavePinModal
            ifModalOn={ifSavePinModalOn}
            setIfModalOn={setIfSavePinModalOn}
            imageFile={imageFile}
            setImageFile={setImageFile}
            APIaddPin={APIaddPin}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setMemo={setMemo}
          />

          <EndWalkModal
            ifModalOn={ifEndWalkModalOn}
            duration={duration}
            distance={distance}
            pinNum={pinNum}
            routeId={routeId}
          />

          <WalkInfoBox
            distance={Math.round(distance) + "m"}
            stTime={duration}
            address={currentAddress}
          />

          <FloatingButton
            ifBlack={false}
            onClick={() => {
              APIendWalk();
            }}
            iconSrc="/icons/walk/cancel.svg"
            iconWidth={22}
            iconHeight={22}
            content="산책 그만하기"
          />
        </>
      ) : null}

      <style jsx>{`
        #map {
          width: 100vw;
          flex: 1;

          filter: grayscale(20%);
          z-index: 1;
        }

        .backButton {
          position: absolute;
          top: 43px;
          left: 23.5px;
          z-index: 2;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        }

        .currentLocationButton {
          position: absolute;
          top: 99px;
          left: 23.5px;
          z-index: 2;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        }
      `}</style>
    </div>
  );
}

function WalkInfoBox({ distance, stTime, address }) {
  return (
    <div className="container">
      <div className="infoBox">
        <div className="contentBox">
          <Image src="/icons/walk/walk_black.svg" width={11.25} height={18} />
          {distance}
        </div>
        <div style={{ width: 1, height: 43.5, backgroundColor: "#F5F5F5" }} />
        <div className="contentBox">
          <Image src="/icons/walk/clock.svg" width={15} height={15} />
          {stTime}
        </div>
      </div>
      <div className="addressBox">{address}</div>
      <style jsx>{`
        .container {
          width: 133px;
          height: 64px;

          background: #ffffff;
          border-radius: 12px;

          padding: 24px 26px 12px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          position: fixed;
          top: 44px;
          z-index: 2;
          left: 50%;
          transform: translateX(-50%);

          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        }

        .infoBox {
          display: flex;
          justify-content: space-between;

          height: 43.5px;
          width: 100%;
        }

        .contentBox {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          width: 52px;
          height: 100%;

          color: #777;
          font-size: 13px;
          font-weight: 600;
        }

        .addressBox {
          color: #777;
          font-size: 9px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

function customPinContent() {
  return `
    <div>
      <img
        src="/icons/pin/flag.svg",
        style="
          width: 21px;
          height: 26.5px;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
        "
      />
    </div>
  `;
}

function customSelectedPinContent() {
  return `
    <div>
      <img
        src="/icons/pin/selected_flag.svg",
        style="
          width: 21px;
          height: 26.5px;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
        "
      />
    </div>
  `;
}

function currentLocationMarkerContent({ imgSrc, width, height, offset }) {
  return `
    <div>
      <img
        src="${imgSrc}",
        style="
          width: ${width}px;
          height: ${height}px;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
          transform: translateY(${offset}px);
        "
      />
    </div>
  `;
}
