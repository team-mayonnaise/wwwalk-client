import {
  getCurrentPostion,
  getDistanceBetweenCoor,
} from "@/public/functions/location";
import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";

export default function Map() {
  ////전역
  useEffect(() => {
    getCurrentLocation();
  }, []);

  //// 지도 관련
  const renderMap = useRef(false);
  const [kakaoMap, setKakaoMap] = useState(null);

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

  // useEffect(() => {
  //   if (!kakaoMap) return;
  //   console.log("pinMarkers", pinMarkers);
  // }, [pinMarkers]);

  function renderPin({ pinInd }) {
    pinMarkers[pinInd].setMap(null);
    const content = customPinContent();
    const position = new window.kakao.maps.LatLng(
      pins[pinInd].lat,
      pins[pinInd].lon
    );

    const customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      clickable: false,
    });
    customMarker.setMap(kakaoMap);
    pinMarkers[pinInd] = customMarker;
  }

  function renderSelectedPin({ pinInd }) {
    pinMarkers[pinInd].setMap(null);
    const content = customSelectedPinContent();
    const position = new window.kakao.maps.LatLng(
      pins[pinInd].lat,
      pins[pinInd].lon
    );

    const customMarker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      clickable: false,
    });
    customMarker.setMap(kakaoMap);

    pinMarkers[pinInd] = customMarker;
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
  function erasePath() {
    selectedPinRoutePath.forEach((path) => {
      path.setMap(null);
    });
  }

  //// 현재위치 관련
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  //현재위치 가져오기
  function getCurrentLocation() {
    getCurrentPostion(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log(latitude, longitude);
        setCurrentLocation({ lat: latitude, lon: longitude });
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

    const content = currentLocationMarkerContent({});
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

  return (
    <div id="map">
      <div className="currentLocationButton" onClick={getCurrentLocation}>
        <img src="/icons/pin/toCurLocation.svg" />
      </div>

      <style jsx>{`
        #map {
          width: 100vw;
          flex: 1;

          filter: grayscale(20%);
        }

        .currentLocationButton {
          position: absolute;
          top: 103.5px;
          left: 23.5px;
          z-index: 2;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
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

function currentLocationMarkerContent() {
  return `
    <div>
      <img
        src="/icons/pin/myLocation.svg",
        style="
          width: 29px;
          height: 29px;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        "
      />
    </div>
  `;
}
