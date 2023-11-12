import Image from "next/image";
import { useState } from "react";

export default function BoardComponent({ route, APIGetComments }) {
  const [curPinInd, setCurPinInd] = useState(0);

  return (
    <div className="container">
      <div className="titleBox">
        <img src={route.photo_url} className="profileImage" />
        <div style={{ width: 12 }} />
        <div className="contentBox">
          <div className="nameBox">
            {route.route_name} | {route.userName}
          </div>
          <div className="infoBox">
            <Image src="/icons/target.svg" width={9.5} height={9.5} />
            <div style={{ width: 4.5 }} />
            경상감영공원 ··· 경북대 병원
            <div style={{ width: 12 }} />
            <Image src="/icons/walk_black.svg" width={12.32} height={7.7} />
            <div style={{ width: 4.5 }} />
            {route.distance}m
            <div style={{ width: 12 }} />
            <Image src="/icons/clock.svg" width={9.24} height={9.24} />
            <div style={{ width: 4.5 }} />
            {route.duration / 60000 < 1
              ? ""
              : Math.floor(route.duration / 60000) + "m "}
            {Math.floor((route.duration % 60000) / 1000)}s
            <div style={{ width: 12 }} />
            <Image src="/icons/pin/flag.svg" width={8.44} height={10.55} />
            <div style={{ width: 4.5 }} />
            {route.pins.length}개
          </div>
        </div>
      </div>

      <div className="pinBox">
        {route.pins.map((pin) => {
          <div className="imageBox">
            <img src={pin.photo_url} width={273} height={273} />
            <div className="infoBox">
              <Image src="/icons/flag_white.svg" width={8.44} height={10.55} />
              <div style={{ width: 6.56 }} />
              <div className="contentBox">
                <b>{pin.address_Name}</b>
                <br />
                {pin.address}
              </div>
            </div>
          </div>;
        })}
      </div>

      <div className="detailBox">
        <div className="contentBox">
          <div className="memo">
            {route.pins.length === 0 ? "" : route.pins[curPinInd].memo}
          </div>
          <div className="likes">
            좋아요 {route.favorit_num == null ? 0 : route.favorit_num}개와 댓글{" "}
            {route.comment_num == null ? 0 : route.comment_num}개 모두 보기
          </div>
          <div className="time">2시간 전</div>
        </div>
        <div className="buttonBox">
          <Image
            src="/icons/community/heart_outline.svg"
            width={15.9}
            height={15.9}
          />
          <Image
            src="/icons/community/comment.svg"
            width={15.9}
            height={15.9}
            onClick={() => {
              APIGetComments({ routeId: route.route_id });
            }}
          />
          <Image src="/icons/community/music.svg" width={15.9} height={15.9} />
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          height: 422px;

          margin-top: 30px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .titleBox {
          width: 366px;

          display: flex;
        }
        .titleBox .profileImage {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }

        .titleBox .contentBox {
          height: 34px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .titleBox .contentBox .nameBox {
          color: #000;
          font-size: 12px;
          font-weight: 600;
        }

        .titleBox .contentBox .infoBox {
          color: #777;
          font-size: 8.895px;
          font-weight: 600;

          display: flex;
        }

        .pinBox {
          width: 100%;
          height: 273px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          overflow-x: scroll;
          overflow-y: hidden;
        }

        .pinBox .imageBox {
          min-width: 273px;
          height: 273px;
          margin-right: 11px;

          position: relative;
        }
        .pinBox .imageBox img {
          object-fit: cover;
        }
        .pinBox .infoBox {
          width: 125px;
          height: 35px;

          position: absolute;
          bottom: 0;
          left: 12px;

          z-index: 999;

          display: flex;
        }
        .pinBox .infoBox .contentBox {
          color: #ffffff;
          font-size: 8.895px;
          font-weight: 400;
        }
        .pinBox .infoBox .contentBox b {
          color: #ffffff;
          font-size: 8.895px;
          font-weight: 600;
        }

        .detailBox {
          width: 359.1px;
          height: 85px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detailBox .contentBox {
          width: 315px;
          height: 85px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;
        }

        .detailBox .contentBox .memo {
          color: #000;
          font-size: 12px;
          font-weight: 600;
          line-height: 21px;

          width: 315px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 라인수 */
          -webkit-box-orient: vertical;
        }
        .detailBox .contentBox .likes {
          color: #000;
          font-size: 12px;
          font-weight: 300;
          line-height: 21px;
        }
        .detailBox .contentBox .time {
          color: #777777;
          font-size: 8.89px;
          font-weight: 600;
        }

        .detailBox .buttonBox {
          height: 85px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
