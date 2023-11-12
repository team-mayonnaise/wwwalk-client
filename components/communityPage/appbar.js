import Image from "next/image";

export default function AppBar() {
  return (
    <div className="container">
      <Image src="/icons/logo/miniLogo.svg" width={35} height={22.29} />
      <style jsx>{`
        .container {
          height: 52px;
          padding-left: 19px;

          display: flex;
          justify-content: start;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
