// import "@/styles/globals.css";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/homePage/homePage";
  }, []);
  return <>root</>;
}
