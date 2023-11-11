/**
 *
 * @param {(position: GeolocationPosition)=>{}} successCallback
 *  : 성공시 실행할 함수.
 *    position.coords.latitude, position.coords.longitude 로 위경도 뽑을 수 있음
 * @param {(error : GeolocationPositionError)=>{}} errorCallback
 *  : 실패시 실행할 함수
 */
export function getCurrentPostion(successCallback, errorCallback) {
  const { geolocation } = navigator;

  geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity,
  });
}

/**
 *
 * @param {number} lat1 : 좌표 1 위도
 * @param {number} lon1 : 좌표 1 경도
 * @param {number} lat2 : 좌표 2 위도
 * @param {number} lon2 : 좌표 2 경도
 * @returns 거리(미터)
 */
export function getDistanceBetweenCoor(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 두 지점 간의 거리 (단위: km)
  return distance * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
