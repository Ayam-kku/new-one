import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, SvgIcon, TextField } from "@material-ui/core";
import { SearchIcon } from "@material-ui/data-grid";
import ClubCard from "./ClubCard";

export default function AllClub() {

  useEffect(() => {
    Aos.init({duration:2000});
  },[]);

  return (
    
    <section className="pt-20 pb-48 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-12">
              <div className="w-full lg:w-6/12 px-4">
                <h2  className="text-green-500 uppercase font-bold text-5xl">
                جميع الأندية في الجامعة
                </h2>
                <div className="flex flex-wrap justify-center mt-16">
                
                    <TextField 
                    style={{textAlign:'center' }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="large"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="ابحث عن نادي"
                    variant="filled"
                  />
                  
                </div>
              </div>
              
            </div>
            <div className="flex flex-wrap justify-center text-center">
              <ClubCard/>
            </div>
          </div>
        </section>
    
    );
}
