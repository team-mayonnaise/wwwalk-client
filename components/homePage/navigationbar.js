import Image from "next/image";

export default function NavigationBar() {
  return (
    <div className="container">
      <div className="navBox">
        <NavButton
          imgSrc="/icons/navbar_icons/home.svg"
          imgWidth={21.52}
          imgHeight={20.49}
          text="홈"
        />
        <NavButton
          imgSrc="/icons/navbar_icons/community.svg"
          imgWidth={19.2}
          imgHeight={19.2}
          text="커뮤니티"
        />
        <NavButton
          imgSrc="/icons/navbar_icons/walk.svg"
          imgWidth={16}
          imgHeight={25.6}
          text="산책하기"
        />
        <NavButton
          imgSrc="/icons/navbar_icons/favorite.svg"
          imgWidth={14.4}
          imgHeight={18}
          text="찜"
        />
        <NavButton
          imgSrc="/icons/navbar_icons/profile.svg"
          imgWidth={17.6}
          imgHeight={19.56}
          text="프로필"
        />
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 96px;

          display: flex;
          justify-content: center;
          align-items: start;

          border-top: 0.4px solid #777;
        }

        .navBox {
          width: 335.76px;
          height: 44.62px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 9px;
        }
      `}</style>
    </div>
  );
}

function NavButton({ imgSrc, imgWidth, imgHeight, text }) {
  return (
    <div className="container">
      <Image
        src={imgSrc}
        width={imgWidth}
        height={imgHeight}
        style={{
          flex: 1,
        }}
        alt={text}
      />
      {text}

      <style jsx>{`
        .container {
          width: 33px;
          height: 44.62px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          color: #777;
          text-align: center;
          font-size: 9px;
          font-weight: 200;
        }
      `}</style>
    </div>
  );
}
