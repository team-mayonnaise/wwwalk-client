import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useRef } from "react";
import storage from "@/firebase/storage";

export default function SavePinModal({
  imageFile,
  setImageFile,
  ifModalOn,
  setIfModalOn,
  APIaddPin,
  imageURL,
  setImageURL,
  setMemo,
}) {
  useEffect(() => {
    if (imageFile !== null && ifModalOn === true) {
      uploadImage(imageFile);
    }
  }, [imageFile, ifModalOn]);

  const progressCircleRef = useRef();

  function uploadImage(file) {
    const imageRef = ref(storage, `images/${uuid()}.png`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        // console.log("Upload is " + progress + "% done");
        progressCircleRef.current.style["stroke-dashoffset"] =
          157 - 157 * progress;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          console.log(downloadURL);
          setImageFile(null);
          // console.log("File available at", downloadURL);
        });
      }
    );
  }

  return (
    <div className="container">
      <div className="modalBox">
        <div className="imageBox">
          {imageURL ? (
            <img
              src={imageURL}
              className="image"
              alt="사진"
              width={326.83}
              height={168.69}
            />
          ) : imageFile ? (
            <div className="imageOnUploadBox">
              <img
                src={URL.createObjectURL(imageFile)}
                className="imageOnUpload"
                alt="사진 업로드 중"
                width={326.83}
                height={168.69}
              />
              <svg className="imagePercentageCircle" overflow={"visible"}>
                <circle
                  cx={"50%"}
                  cy={"50%"}
                  r={"25"}
                  ref={progressCircleRef}
                />
              </svg>
            </div>
          ) : null}
          <button
            className="cancelButton"
            onClick={() => {
              setIfModalOn(false);
              setImageFile(null);
            }}
          >
            <Image src="/icons/walk/cancel.svg" width={18} height={18} />
          </button>
        </div>
        <div className="pinInfoBox">
          <div className="title">
            <Image src="/icons/pin/flag.svg" width={11.2} height={14} />
            <div style={{ width: 7.8 }} />
            아눅 대구
          </div>
          <div className="address">동구 동부로 158-5 (신천동)</div>
        </div>
        <div className="memoBox">
          <Image
            src="/icons/edit.svg"
            width={12}
            height={12}
            style={{ marginTop: 4 }}
          />
          <div style={{ width: 6 }} />
          <textarea
            placeholder="산책하는 길에 어떤 것을 발견하셨나요?"
            onChange={(event) => {
              setMemo(event.target.value);
            }}
          ></textarea>
        </div>
        <button
          className="saveButton"
          onClick={() => {
            APIaddPin();
          }}
        >
          핀 저장하기
        </button>
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
          top: 150px;
          left: 50%;
          transform: translateX(-50%);

          background: #ffffff;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 326.83px;
          height: 389px;

          border-radius: 13.33px;
        }

        .imageBox {
          width: 326.83px;
          height: 168.69px;
        }

        .imageBox img {
          border-top-left-radius: 13.33px;
          border-top-right-radius: 13.33px;

          object-fit: cover;
        }
        .imageOnUploadBox {
          margin: 18px auto 14px auto;
          width: 241px;
          position: relative;
        }
        .imageOnUpload {
          width: 241px;
          border-radius: 13px;

          filter: blur(2px);
        }
        .imagePercentageCircle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);

          width: 50px;
          height: 50px;
        }
        .imagePercentageCircle circle {
          fill: none;
          stroke-width: 5px;
          stroke: #dadada;

          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.5s ease;
        }

        .imageBox .cancelButton {
          position: absolute;
          top: 8px;
          right: 8px;

          background: transparent;
          border: none;
        }

        .pinInfoBox {
          width: 269.8px;
          height: 39px;
          margin: 28.5px 24.78px 0 24.78px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;
        }

        .pinInfoBox .title {
          display: flex;

          color: #000;
          font-size: 13px;
          font-weight: 600;
        }

        .pinInfoBox .address {
          color: #777;
          font-size: 11px;
          font-weight: 400;
        }

        .memoBox {
          width: 269.8px;
          height: 34px;
          margin: 18px 24.78px 0 24.78px;

          display: flex;
        }

        .memoBox textarea {
          width: 229px;
          height: 34px;

          border: none;
          outline: none;

          color: #777;
          font-family: Pretendard;
          text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.25);
          font-size: 13px;
          font-weight: 600;

          resize: none;
        }

        .saveButton {
          width: 283px;
          height: 53px;

          margin-top: 27px;

          background: #000000;

          color: #ffffff;
          font-size: 13.333px;
          font-weight: 700;

          border-radius: 4.44px;
        }
      `}</style>
    </div>
  );
}
