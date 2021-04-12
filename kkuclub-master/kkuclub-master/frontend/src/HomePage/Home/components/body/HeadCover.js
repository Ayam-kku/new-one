import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";


export default function HeadCover() {

  useEffect(() => {
    Aos.init({duration:2000});
  },[]);

  return (
    
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
              minHeight: "75vh"
            }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url('https://ajel.sa/uploads/material-file/5f3e877f0af5466cc3449693/5f3e87c61277e.jpg')"
              }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div  className="pr-12">
                    <h1 data-aos="fade-right" className="text-green-500 font-black text-5xl">
                      STUDENT CLUBS<span className="text-white font-semibold text-5xl"> at King Khalid University</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                    This platform aspires to display all student clubs.
                    And helping students to participate and benefit 
                    from the activities that clubs offer.
                    </p>
                  </div>
                </div>

              </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
          </main>
    
    );
}
