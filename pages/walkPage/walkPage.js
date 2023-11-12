import Map from "@/components/walkPage/map";

export default function WalkPage() {
  return (
    <div className="container">
      <Map />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
