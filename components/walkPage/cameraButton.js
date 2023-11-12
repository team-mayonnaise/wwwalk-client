import Image from "next/image";
import { useRef } from "react";

export default function CameraButton({ setImageFile, setIfModalOn }) {
  const imageInputRef = useRef();

  return (
    <div
      className="container"
      onClick={() => {
        imageInputRef.current.click();
      }}
    >
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={(file) => {
          if (file.target.files.length > 0) {
            setImageFile(file.target.files[0]);
            setIfModalOn(true);
          }
        }}
      />
      <Image src="/icons/camera.svg" width={27} height={27} />
      <style jsx>{`
        .container {
          width: 55px;
          height: 55px;

          background: #000000;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          position: fixed;
          bottom: 131px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;

          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
        }
      `}</style>
    </div>
  );
}
