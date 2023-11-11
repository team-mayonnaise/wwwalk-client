import Image from "next/image";

export default function AppBar() {
  return (
    <div className="container">
      <div className="searchBox">
        <input type="text" placeholder="검색어를 입력하세요." />
        <Image src="/icons/search.svg" width={15} height={15} alt="검색" />
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 76px;
          background-color: #fff;

          position: fixed;
          z-index: 2;

          display: flex;
          justify-content: start;
          align-items: center;

          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        }

        .searchBox {
          width: 352.5px;
          height: 36px;
          border-bottom: 2px solid #000;

          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 0 7px 0 19px;
        }

        .searchBox input {
          width: 320px;

          color: #777;

          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.1px;

          border: none;
          outline: none;
        }
      `}</style>
    </div>
  );
}
