import AppBar from "@/components/homePage/appbar";
import NavigationBar from "@/components/homePage/navigationbar";
import Map from "@/components/homePage/map";

export default function homePage() {
  return (
    <div className="container">
      <AppBar />
      <Map />
      <NavigationBar />
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
