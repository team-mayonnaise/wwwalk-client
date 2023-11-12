import Image from "next/image";

export default function FloatingButton({
  ifBlack,
  onClick,
  iconSrc,
  iconWidth,
  iconHeight,
  content,
}) {
  return (
    <div className="container" onClick={onClick}>
      <div className="contentBox">
        <div className="iconBox">
          <Image src={iconSrc} width={iconWidth} height={iconHeight} />
        </div>
        <div style={{ width: 9.25 }} />
        <div className="content">{content}</div>
      </div>
      <style jsx>{`
        .container {
          height: 50px;
          width: 351px;

          border-radius: 4px;

          background: ${ifBlack ? "#000000" : "#ffffff"};

          position: fixed;
          bottom: 31px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;

          filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .contentBox {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .content {
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;

          color: ${ifBlack ? "#ffffff" : "#000000"};
        }
      `}</style>
    </div>
  );
}
