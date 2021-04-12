import React, { useEffect, useState } from "react";
import Controls from "src/PresidentDashboards/views/ClubDashboard/controls/Controls";
import { getCollege, postNewStudent } from "./EventService";

const initialFValues = {
  name: '',
  email: '',
  status:'Active',
  password:'student',
  usertype: 'Student',
  phone: '',
  uniID: '',
  jobID: '',
  major: '',
  deanCollege: '',
  level: '',
  qualification: '',
  officeNo: ''   
}


export default function ComingEvent() {


  const [colleges, setColleges] = useState([]);
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
}
const handleSubmit = e => {
  e.preventDefault()
  postNewStudent(values)
  setValues(initialFValues)
      
  }
  
  

    
    useEffect(() => {
      getCollege().then((u) =>{ 
        setColleges(u)});
    }, [])
  

  return (
        <section >
          <form onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-2">
              
                <div className="relative flex flex-col min-w-0 break-words w-full bg-gray-300">
                  <div className="flex-auto p-5">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Full Name"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        phone
                      </label>
                      <input
                        name="phone"
                        maxlength="10"
                        value={values.phone}
                        onChange={handleInputChange}
                        type="text"
                        className="border-0 px-3 py-3 normal-nums placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Phone"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        university ID
                      </label>
                      <input
                        name="uniID"
                        maxlength="9"
                        value={values.uniID}
                        onChange={handleInputChange}
                        type="text"
                        className="border-0 px-3 py-3 normal-nums placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="University ID"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0 break-words w-full bg-gray-300">
                  <div className="flex-auto p-5">
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        College
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="University ID"
                         >
                        < option> None </option>
                              {
                    colleges.map(
                        item => (<option key={item._id} value={JSON.stringify(item)}>{item.name}</option>)
                    )
                }
                        </select>
                        
                      
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        major
                      </label>
                      <input
                        name="major"
                        value={values.major}
                        onChange={handleInputChange}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Major"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        level
                      </label>
                      <input
                        name="level"
                        value={values.level}
                        onChange={handleInputChange}
                        min="1" 
                        max="5"
                        type="number"
                        className="border-0 px-3 py-3 normal-nums placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Level"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        Submit
                      </button>
                    </div>
                    </form>
        </section>
    );
}
