import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { getMemberArray, getEventArray, getClubArray } from './BodyService';
import CountUp from 'react-countup';
import { SearchIcon } from "@material-ui/data-grid";


export default function Statistics() {
  const [users, setusers] = useState(0);
  const [event, setevent] = useState(0);
  const [club, setclub] = useState(0);
  
  const a =users
  
  
  useEffect(() => {
     
    getMemberArray().then((u) =>{ 
      setusers(u)});
    getEventArray().then((u) =>{ 
          setevent(u)});
    getClubArray().then((u) =>{ 
          setclub(u)});
  }, [])
  useEffect(() => {
    Aos.init({duration:2000});
  },[]);

  return (
    
    <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div  className="lg:pt-6 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fab fa-font-awesome-flag"></i>
                    </div>
                    <h6 className="text-xl font-semibold">نادي</h6>
                    <p className="normal-nums font-bold text-6xl mt-2 mb-4 text-green-500">
                     <CountUp duration={3} end={club}/>
                      
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-users"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                    طالب
                    </h6>
                    <p className="font-bold normal-nums text-6xl mt-2 mb-4 text-green-500">
                    <CountUp duration={3} start={0} end={users}/>
                    </p>
                   
                  </div>
                </div>
                <div className="flex flex-wrap justify-center text-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <h2  className="text-black-500 font-bold text-4xl">
                    إحصائيات
                    </h2>
                    </div>
                    </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                    <i className="fab fa-buysellads"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      فعالية
                    </h6>
                    <p className="normal-nums font-bold text-6xl mt-2 mb-4 text-green-500">
                    <CountUp duration={3} end={event}/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
    );
}
