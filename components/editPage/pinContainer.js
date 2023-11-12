import Image from "next/image";
import { useState, useEffect } from "react";

export default function PinContainer({
  onPointChange,
  currentPinInd,
  currentPoint,
  pointLength,
  pins,
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="container">
      <EditModeComponent
        isEditMode={isEditMode}
        onPointChange={onPointChange}
        currentPinInd={currentPinInd}
        currentPoint={currentPoint}
        pointLength={pointLength}
        setIsEditMode={setIsEditMode}
      />

      {/* <MidStroke
        height={isEditMode ? (pointLength - 1) * 144 + 65 : pointLength * 144}
      /> */}

      <div className="topBox">
        <div className="index">핀</div>
        <div style={{ width: 61 }} />
        <div className="index">코스</div>
        <div style={{ width: 181 }} />
        <div
          className="addPinButton"
          onClick={() => {
            setIsEditMode(true);
            // document.querySelector("#pinContainer").scrollTo({
            //   //한 element 높이
            //   top: document.querySelector("#pinContainer").scrollTop + 65,
            //   behavior: "smooth",
            // });
          }}
        >
          핀 추가하기
        </div>
      </div>

      <div className="pinBox" id="pinContainer">
        {isEditMode ? <div style={{ minHeight: 65 }} /> : null}
        {pins.map((pin, ind) => {
          return (
            <>
              <PinElement
                key={ind}
                isEditMode={isEditMode}
                pin={pin}
                ind={ind}
              />
              {isEditMode && currentPinInd === ind ? <AddPinButton /> : null}
            </>
          );
        })}
        <AddTagBox />
        <PlayListBox />
        <PublicBox />
        <SaveButton />
      </div>

      <style jsx>{`
        .container {
          position: fixed;
          bottom: 0;
          left: 0;

          background-color: ${isEditMode ? "#d9d9d9" : "#f8f8f8"};

          width: 100vw;
          height: 420px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          border-radius: 8px 8px 0px 0px;

          box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.15);

          z-index: 999;
        }

        .topBox {
          width: 343px;

          display: flex;

          margin-top: 26px;
        }
        .topBox .index {
          color: #777;
          font-size: 8px;
          font-weight: 600;
        }
        .topBox .addPinButton {
          width: 78px;
          height: 20px;
          background-color: #000000;

          display: flex;
          justify-content: center;
          align-items: center;

          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          border-radius: 10px;
        }

        .pinBox {
          margin-top: 21.88px;

          width: 100%;
          height: 354px;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;

          overflow-x: hidden;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  );
}

// function MidStroke({ height }) {
//   return (
//     <div className="container">
//       <style jsx>{`
//         .container {
//           border: none;
//           border-top: 1px dotted #f00;
//           color: #fff;
//           background-color: #fff;
//           height: {height}px;
//           width: 1px;

//           display: fixed;
//           top: 26.5px;
//           left: 72px;
//         }
//       `}</style>
//     </div>
//   );
// }

function PinElement({ isEditMode, pin }) {
  return (
    <div className="container">
      <div className="pinInfoBox">
        <div className="pinNum">
          <Image src="/icons/pin/flag.svg" width={9.8} height={12.25} />
          <div style={{ width: 5 }} />1
        </div>
      </div>

      <div className="pinContentBox">
        <div className="contentBox">
          <div className="title">{pin.address_Name}</div>
          <div style={{ height: 6 }} />
          <div className="address">{pin.address}</div>
          <div style={{ height: 19 }} />
          <div className="memo">{pin.memo}</div>
          <div style={{ height: 10 }} />
          <div className="edit">
            <Image src="/icons/edit_light.svg" width={8} height={8} />
            <div style={{ width: 4 }} />
            수정하기
          </div>
        </div>
        <div style={{ width: 17 }} />
        <img src={pin.photo_url} />
      </div>

      <div style={{ width: 10 }} />

      <div className="deleteButton">
        <Image src="/icons/walk/cancel.svg" width={14} height={14} />
      </div>
      <style jsx>{`
        .container {
          width: 343.01px;
          min-height: 129px;

          margin-bottom: 15px;

          display: flex;
        }

        .pinInfoBox {
          height: 129px;
          width: 69px;
          display: flex;
        }

        .pinInfoBox .pinNum {
          color: #000;
          font-size: 16px;
          font-weight: 600;

          display: flex;
        }

        .pinContentBox {
          width: 250px;
          height: 129px;

          border-radius: 3px;
          background-color: ${isEditMode ? "#f8f8f8" : "#ffffff"};
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pinContentBox .contentBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }
        .pinContentBox .contentBox .title {
          color: #000;
          font-size: 12px;
          font-weight: 600;
        }
        .pinContentBox .contentBox .address {
          color: #000;
          font-size: 8px;
          font-weight: 300;
        }
        .pinContentBox .contentBox .memo {
          color: #000;
          font-size: 8px;
          font-weight: 600;
          line-height: 14px;

          width: 124px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* 라인수 */
          -webkit-box-orient: vertical;
        }
        .pinContentBox .contentBox .edit {
          color: #b5b5b5;
          font-size: 8px;
          font-weight: 600;

          display: flex;
        }

        .pinContentBox img {
          width: 82px;
          height: 106px;

          border-radius: 2px;

          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }

        .deleteButton {
          height: 129px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function EditModeComponent({
  isEditMode,
  onPointChange,
  currentPinInd,
  currentPoint,
  pointLength,
  setIsEditMode,
}) {
  useEffect(() => {
    onPinChange(currentPinInd);
  }, [currentPinInd]);

  function onPinChange(pinInd) {
    console.log(pinInd);
    // console.log((isEditMode ? 65 : 0) + 144 * pinInd);
    document.querySelector("#pinContainer").scrollTo({
      //한 element 높이
      top: 144 * pinInd,
      behavior: "smooth",
    });
  }

  return (
    <div className="container">
      <div className="topBox">
        <div className="instruction">
          <Image src="/icons/alert.svg" width={14} height={14} />
          <div style={{ width: 5 }} />
          핀을 <u>좌우</u> 로 움직여 보세요.
        </div>
        <div
          className="selectButton"
          onClick={() => {
            setIsEditMode(false);
          }}
        >
          선택
        </div>
      </div>

      <div className="rangeSliderBox">
        <input
          type="range"
          min={0}
          max={pointLength - 1}
          value={currentPoint}
          onChange={onPointChange}
        ></input>
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: 0;

          background-color: #f8f8f8;

          width: 100vw;
          height: 117px;

          display: ${isEditMode ? "flex" : "none"};
          border-radius: 8px 8px 0px 0px;

          z-index: 100;

          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

          flex-direction: column;
          justify-content: start;
          align-items: center;
        }

        .topBox {
          width: 344.83px;
          height: 22.12px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 25px;
        }

        .topBox .instruction {
          color: #000;
          font-size: 12px;
          font-weight: 600;

          display: flex;
          white-space: pre-wrap;
        }

        .topBox .instruction u {
          text-decoration: underline #ff327cb2;
        }

        .topBox .selectButton {
          width: 45px;
          height: 22.12px;

          font-size: 10px;
          font-weight: 500;

          color: #ffffff;
          background-color: #000000;

          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .rangeSliderBox {
          width: 336.5px;
          height: 39px;

          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;

          margin-top: 5px;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 5px;
          background: #ffffff; /* Default track color */
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff327c; /* Thumb color */
          cursor: pointer;
          margin-top: -3px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        }

        input[type="range"]::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          cursor: pointer;
          border-radius: 5px;
          background: #000; /* Change track color here */
        }
      `}</style>
    </div>
  );
}

function AddPinButton() {
  return (
    <div className="container">
      <div className="addPinButton">
        <Image src="/icons/add.svg" width={10} height={10} />
        <div style={{ width: 5 }} />
        새로운 핀 생성
      </div>
      <style jsx>{`
        .container {
          width: 343.01px;
          min-height: 33px;

          margin-bottom: 15px;
        }

        .addPinButton {
          width: 250px;
          height: 33px;

          background-color: #ffffff;

          margin-left: 69px;

          display: flex;
          justify-content: center;
          align-items: center;

          color: #000000;
          font-size: 12px;
          font-weight: 600;
          text-align: center;

          border-radius: 3px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

function AddTagBox() {
  const [tags, setTags] = useState([]);

  return (
    <div className="container">
      <div className="inputBox">
        <Image src="/icons/edit/hashTag.svg" width={24} height={24} />
        <div style={{ width: 13 }} />
        <input
          placeholder="태그를 입력해주세요."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setTags([...tags, "#" + e.target.value]);
              e.target.value = "";
            }
          }}
        ></input>
      </div>
      <div style={{ height: 1, width: 308.99, backgroundColor: "#d9d9d9" }} />
      <div className="tagBox">
        {tags.map((tag) => {
          return (
            <div
              className="tag"
              onClick={() => {
                setTags(tags.filter((curTag) => curTag !== tag));
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .container {
          width: 347px;
          min-height: 106px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .inputBox {
          width: 347px;
          height: 64px;

          display: flex;
          justify-content: end;
          align-items: center;
        }

        .inputBox input {
          width: 286.31px;
          height: 19px;

          border: none;
          outline: none;

          background-color: transparent;

          color: #070707;
          font-size: 12px;
          font-weight: 600;
        }

        .tagBox {
          width: 309px;
          height: 64px;

          display: flex;
          justify-content: start;
          align-items: center;
        }

        .tagBox .tag {
          height: 24px;
          margin-right: 5px;

          background-color: #ffffff;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 0px 12px 0px 12px;

          border-radius: 12px;
          border: 0.3px solid #d9d9d9;

          color: #000;
          font-size: 10px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

function PlayListBox() {
  const [playList, setPlayList] = useState();

  return (
    <div className="container">
      <div className="inputBox">
        <Image src="/icons/edit/playlist.svg" width={24} height={24} />
        <div style={{ width: 13 }} />
        <input
          placeholder="플레이리스트를 공유해주세요."
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setPlayList(e.target.value);
            }
          }}
        ></input>
      </div>
      <style jsx>{`
        .container {
          width: 347px;
          min-height: 39px;

          display: flex;
        }

        .inputBox {
          width: 347px;
          height: 39px;

          display: flex;
          justify-content: end;
          align-items: center;
        }

        .inputBox input {
          width: 286.31px;
          height: 19px;

          border: none;
          outline: none;

          background-color: transparent;

          color: #070707;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function PublicBox() {
  const [playList, setPlayList] = useState();

  return (
    <div className="container">
      <div className="inputBox">
        <Image src="/icons/edit/public.svg" width={24} height={24} />
        <div style={{ width: 13 }} />
        <div className="text">공개 여부를 선택하세요.</div>
        <div style={{ width: 63 }} />
        <PublicButton />
      </div>
      <style jsx>{`
        .container {
          width: 309px;
          min-height: 39px;

          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 33px;
        }

        .inputBox {
          width: 347px;
          height: 39px;

          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .inputBox .text {
          width: 124px;
          height: 19px;

          background-color: transparent;

          color: #070707;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function PublicButton() {
  const [ifPublic, setIfPublic] = useState(true);
  return (
    <div
      className="container"
      onClick={() => {
        setIfPublic(!ifPublic);
      }}
    >
      <div className="innerBox"></div>
      <div className="text" style={{ color: ifPublic ? "#ffffff" : "#000000" }}>
        공개
      </div>
      <div className="text" style={{ color: ifPublic ? "#000000" : "#ffffff" }}>
        비공개
      </div>
      <style jsx>{`
        .container {
          width: 121px;
          height: 32px;
          border-radius: 16px;

          background-color: #ffffff;

          display: flex;
          justify-content: space-evenly;
          align-items: center;

          position: relative;

          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        }

        .container .innerBox {
          width: 54px;
          height: 24px;

          position: absolute;
          left: ${ifPublic ? 7 : 56}px;

          background-color: #ff327c;

          border-radius: 12px;
        }

        .container .text {
          width: 28px;
          height: 10px;

          font-size: 10px;
          font-weight: 600;

          z-index: 999;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function SaveButton() {
  return (
    <div
      className="container"
      onClick={() => {
        location.href = "/homePage/homePage";
      }}
    >
      저장하기
      <style jsx>{`
        .container {
          width: 351px;
          min-height: 54px;

          margin-top: 24px;
          margin-bottom: 10px;

          border-radius: 10px;
          background-color: #000000;

          color: #fff;
          font-size: 14px;
          font-weight: 700;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
