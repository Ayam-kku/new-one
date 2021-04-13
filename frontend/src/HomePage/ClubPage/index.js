import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import AddMember from "./AddMember";
import Popup from './Popup';
import EventCard from './EventCard'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(52, 211, 153, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);




const EventProfile = () => {
  const { state } = useLocation();

  const [openPopup, setOpenPopup] = useState(false)

  


  const handleSubmit = () => {    
}

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://mostaql.hsoubcdn.com/uploads/355982-dW2bL-1550220179-v1C3G-1-24.jpg')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
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
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("../Home/assets/img/event1.jpg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "180px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-green-500 hover:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        onClick={() => { setOpenPopup(true) }}
                        style={{ transition: "all .15s ease" }}
                      >
                        Membership
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-3xl font-bold block uppercase tracking-wide text-green-400">
                        {state.member.length}
                        </span>
                        <span className="text-sm text-gray-500 uppercase ">Members</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-3xl font-bold block uppercase tracking-wide text-green-400">
                        {state.event.length}
                        </span>
                        <span className="text-sm text-gray-500 uppercase ">Event</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center ">
                  <h3 className="text-5xl font-bold uppercase leading-normal mb-2 text-gray-800 ">
                    {state.clubName}
                  </h3>
                  <h3 className="text-3xl font-bold border-b-4  uppercase leading-normal mb-2 text-green-500 ">
                      Club event
                  </h3>
                  <EventCard/>
                  <h3 className="text-3xl font-bold uppercase leading-normal mb-2 text-green-500 mt-20 ">
                      About us 
                      
                  </h3>
                  <div className='mt-10 mb-32'>
                      <Accordion square className="bg-green-600">
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                          <h3 className="text-2xl  font-bold uppercase leading-normal  text-green-600">
                            the vision </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                        <p className="italic ">
                                      <i className="fas fa-quote-left mr-2 text-lg text-gray-500"></i>
                                      <spam className="text-xl font-medium text-gray-600">
                                      {state.clubInfo.vision}
                                      </spam>
                                      <i class="fas fa-quote-right ml-2 text-lg text-gray-500"></i>
                                    </p>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion square >
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h3 className="text-2xl  font-bold uppercase leading-normal  text-green-600">
                                        the message
                                    </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                        <p className="italic ">
                                      <i className="fas fa-quote-left mr-2 text-lg text-gray-500"></i>
                                      <spam className="text-xl font-medium text-gray-600">
                                      {state.clubInfo.message}
                                      </spam>
                                      <i class="fas fa-quote-right ml-2 text-lg text-gray-500"></i>
                                    </p>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion square >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" aria-label="Expand">
                        <h3 className="text-2xl font-bold uppercase leading-normal  text-green-600">
                                        the objectives
                                    </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className=" w-2/3 ">
                                      {state.clubInfo.objectives.map((item, index) => (
                                        <ol className=" text-left text-xl list-disc list-inside font-medium ">
                                          <li>{item.objective}</li>
                                        </ol>
                                      ))}
                                  </div>
                        </AccordionDetails>  
                      </Accordion>
                      <Accordion square >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <h3 className="text-2xl  font-bold uppercase leading-normal  text-green-600">
                        the values
                                    </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className=" w-2/3 ">
                                      {state.clubInfo.value.map((item, index) => (
                                        <ol className=" text-left text-xl font-medium ">
                                          <li>{item.value}</li>
                                        </ol>
                                      ))}
                                  </div>
                        </AccordionDetails>  
                      </Accordion>
                    </div>
                  
                
                  {/*<div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                    الموقع
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    {state.evenDate}
                  </div>
                   <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                  </div> */}
                </div>
                {/* <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      To control the margin of an element at a specific breakpoint,  prefix to any existing margin utility. For example, adding the class md:my-8 to an element would apply the my-8 utility at medium screen sizes and above.
                      </p>
                    </div>
                  </div>
                </div> */}
               
              </div>
            </div>
          </div>
        </section>
        <section className="pb-20 relative block bg-gray-900">
        <div
            className="bottom-auto top-0 left-0 right-0 w-full bg-gray-300 absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
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
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div className="text-center mt-12">
                  <h3 className="text-4xl font-bold uppercase leading-normal mb-2 text-white mb-2">
                  Club team 
                  </h3>
        </div>

        <div className=" container mx-auto px-4 lg:pt-24 lg:pb-64 flex bg-gray-900 w-full justify-around ">
                  <div className="flex">
                     <div 
                      className="w-48 bg-cover bg-center -my-10 shadow-lg rounded-lg"
                      style={{
                      backgroundImage:
                        "url(https://media-exp1.licdn.com/dms/image/C5603AQFp7H83NNv2hw/profile-displayphoto-shrink_800_800/0/1557067367220?e=1623283200&v=beta&t=N65HokGppbEXi3HpzKcuTHmPexizsuCp8vpp7z2vpNs)"
                        }}>
                        </div>
                    <div className="bg-white p-8 w-64  shadow-lg rounded-lg overflow-hidden -ml-8">
                      
                      <h2 className="text-2xl font-semibold	uppercase" >Atef MASMOUDI</h2>
                      <span className=" text-gray-400 font-semibold uppercase"> club pioneer</span>
                    </div>
                  </div>
                  <div className="flex">
                     <div 
                      className="w-48 bg-cover bg-center -my-10 shadow-lg rounded-lg"
                      style={{
                      backgroundImage:
                        "url('https://media-exp1.licdn.com/dms/image/C4E03AQE8XCk3EtFgHQ/profile-displayphoto-shrink_800_800/0/1613892014256?e=1623283200&v=beta&t=fANopZUmAwnQ76neS19FHxuz7t1X1-3KNVJwfoa09-E')"
                        }}>
                        </div>
                    <div className="bg-white p-8 w-64  shadow-lg rounded-lg overflow-hidden -ml-8">
                      
                      <h2 className="text-2xl font-semibold	uppercase" >Ali Alfaifi</h2>
                      <span className=" text-gray-400 font-semibold uppercase"> club president</span>
                    </div>
                  </div>
                </div>
        </section>
      </main>
      <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
        <AddMember/>
        </Popup>
    </>
  );
}

export default EventProfile
