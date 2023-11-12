import React, { useEffect, useRef, useState } from "react";

export default function Map({ points, pins, kakaoMap, setKakaoMap }) {
  const renderMap = useRef(false);
  const [pinMarkers, setPinMarkers] = useState([]);
  //// 지도 관련

  useEffect(() => {
    if (!kakaoMap) return;
    if (!points.length) return;
    if (!pins.length) return;
    drawPath();
    renderStartEndPoint();
    renderPins();
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

  function drawPath() {
    const linePath = points.map((point) => {
      return new kakao.maps.LatLng(point.lat, point.lon);
    });

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: "#000000", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(kakaoMap);

    // 한눈에 보기
    var bounds = new kakao.maps.LatLngBounds();
    for (var i = 0; i < linePath.length; i++) {
      bounds.extend(linePath[i]);
    }
    kakaoMap.setBounds(bounds);
  }

  function renderStartEndPoint() {
    const content = customPointMarkerContent({});

    const st = new window.kakao.maps.LatLng(points[0].lat, points[0].lon);

    const stMarker = new window.kakao.maps.CustomOverlay({
      position: st,
      content: content,
      clickable: false,
    });
    stMarker.setMap(kakaoMap);

    const ed = new window.kakao.maps.LatLng(
      points[points.length - 1].lat,
      points[points.length - 1].lon
    );

    const edMarker = new window.kakao.maps.CustomOverlay({
      position: ed,
      content: content,
      clickable: false,
    });
    edMarker.setMap(kakaoMap);
  }

  function renderPins() {
    var curPinMarkers = [];
    pins.forEach((pin) => {
      const content = customPinMarkerContent({});

      const curPoint = points.find((point) => point.point_id === pin.point_id);
      const pinLoc = new window.kakao.maps.LatLng(curPoint.lat, curPoint.lon);

      const pinMarker = new window.kakao.maps.CustomOverlay({
        position: pinLoc,
        content: content,
        clickable: false,
      });
      pinMarker.setMap(kakaoMap);
      curPinMarkers.push(pinMarker);
    });
    setPinMarkers(curPinMarkers);
  }

  return (
    <div className="container" id="map">
      <style jsx>{`
        .container {
          width: 390px;
          height: 270px;
        }
      `}</style>
    </div>
  );
}

function customPointMarkerContent() {
  return `
    <div>
      <img
        src="/icons/pin/myLocation.svg",
        style="
          width: 19.54px;
          height: 19.54px;
          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        "
      />
    </div>
  `;
}

function customPinMarkerContent() {
  return `
    <div>
      <img
        src="/icons/pin/flag.svg",
        style="
          width: 18.39px;
          height: 22.98px;
          transform: translate(50%, -50%);
        "
      />
    </div>
  `;
}
