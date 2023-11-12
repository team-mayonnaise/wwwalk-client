import Image from "next/image";

export default function AppBar({ routeInfo }) {
  return (
    <div className="container">
      <div className="backButton">
        <Image src="/icons/pin/back.svg" width={35} height={35} />
      </div>

      <div className="infoBox">
        <div className="leftBox">
          <div className="titleBox">
            <div>{routeInfo.route_name}</div>
            <div style={{ width: 8.5 }} />
            <div className="editButton">
              <Image src="/icons/edit_light.svg" width={8.12} height={8.12} />
              수정하기
            </div>
          </div>
          <div className="fromToBox">
            <Image src="/icons/target.svg" width={11.66} height={10.96} />
            <div style={{ width: 8.5 }} />
            경상감영공원 ㆍㆍㆍ 경북대 병원
          </div>
          <div className="dateBox">2023.11.11</div>
        </div>

        <div style={{ width: 2, height: 60, backgroundColor: "#F4F4F4" }} />
        <div className="rightBox">
          <div className="contentBox">
            <Image src="/icons/walk.svg" width={7.3} height={11.68} />
            372m
          </div>
          <div className="contentBox">
            <Image src="/icons/walk/clock.svg" width={8.76} height={8.76} />
            4m 35s
          </div>
          <div className="contentBox">
            <Image src="/icons/pin/flag.svg" width={8} height={10} />
            4m 35s
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 149px;

          display: flex;
          justify-content: space-evenly;
          align-items: end;

          padding-bottom: 13px;
        }

        .backButton {
          position: absolute;
          top: 12px;
          left: 24px;
        }

        .infoBox {
          width: 338px;
          height: 73px;

          display: flex;
        }

        .infoBox .leftBox {
          width: 254px;
          height: 73px;

          right-margin: auto;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .infoBox .leftBox .titleBox {
          width: 254px;
          height: 24px;

          font-weight: 600;
          font-size: 24px;
          color: #000000;

          display: flex;
          align-items: end;
        }

        .infoBox .leftBox .titleBox .editButton {
          color: #b5b5b5;
          font-size: 8px;
          font-weight: 600;

          width: 42px;
          height: 10px;
        }

        .infoBox .leftBox .fromToBox {
          color: #000;
          font-size: 10px;
          font-weight: 600;

          display: flex;
        }

        .infoBox .leftBox .dateBox {
          color: #777;
          font-size: 8.432px;
          font-weight: 600;
        }

        .infoBox .rightBox {
          width: 47px;
          height: 50px;
          margin-left: auto;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .infoBox .rightBox .contentBox {
          width: 47px;

          color: #777;
          font-size: 8.432px;
          font-weight: 600;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
