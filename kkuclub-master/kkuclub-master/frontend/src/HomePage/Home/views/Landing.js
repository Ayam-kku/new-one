import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import HeadCover from "../components/body/HeadCover";
import ComingEvent from "../components/body/ComingEvent"
import ClubDisplay from "../components/body/ClubDisplay";
import Statistics from "../components/body/Statistics"
export default function Landing() {

  useEffect(() => {
    Aos.init({duration:2000});
  },[]);

  return (
    <>
      <main>
        
        <HeadCover/>
        <Statistics/>
        <ComingEvent/>
        <ClubDisplay/>

        

        
      </main>
    </>
  );
}
