import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, SvgIcon  } from "@material-ui/core";
import { SearchIcon } from "@material-ui/data-grid";
import EventCard from "./EventCard";

export default function ComingEvent() {

  useEffect(() => {
    Aos.init({duration:2000});
  },[]);

  return (
    
    <section className="pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center">
              <EventCard/>
            </div>
  </div>
        </section>
    
    );
}
