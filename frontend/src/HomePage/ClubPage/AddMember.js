import React, { useEffect, useState } from "react";
import Controls from "src/PresidentDashboards/views/ClubDashboard/controls/Controls";
import { getCollege, postNewStudent } from "./EventService";




export default function ComingEvent() {

  const [inputList, setInputList] = useState([{ skill: "" }]);

  // handle input change
  const handleInputChangeList = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    console.log(list);
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { skill: "" }]);
  };
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
    officeNo: '',
    college:'',
    skills: inputList
  }
  const [colleges, setColleges] = useState([]);
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log(value);
    setValues({
        ...values,
        [name]: value
    })
}
const handleSubmit = e => {
  e.preventDefault()
  const newValue = {
    name: values.name,
    email: values.email,
    status:'Active',
    password:'student',
    usertype: 'Student',
    phone: values.phone,
    uniID: values.uniID,
    jobID: values.jobID,
    major: values.major,
    deanCollege: '',
    level: values.level,
    qualification: '',
    officeNo: '',
    college:JSON.parse(values.college),
    skills: inputList
  }
  postNewStudent(newValue)
  setValues(initialFValues)
  setInputList([{ skill: "" }])
      
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
                
                  <div className="flex-auto px-5">
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
                  <div className="flex-auto px-5">
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
                        name="college"
                        value={values.college}
                        onChange={handleInputChange}
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
              <div className="relative w-full mb-3 w-full bg-gray-300 px-5 pb-3">            
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                        >
                        Your skills
                      </label>
      
                      {inputList.map((x, i) => {
                        return (
                          <div className='flex justify-between mb-3 mt-3'>
                            <input
                              className="border-0 px-3 py-3 normal-nums placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              name="skill"
                              placeholder="Wrtie some of your skill.."
                              value={x.skill}
                              onChange={e => handleInputChangeList(e, i)}
                            />                            
                              {inputList.length !== 1 && <button
                                className=" m-2 border-0 rounded-full shadow bg-white h-4 w-4 flex items-center justify-center"
                                onClick={() => handleRemoveClick(i)}>
                                  <i class="fas fa-minus-circle text-red-400"></i>
                                  </button>}
                              {inputList.length - 1 === i && <button
                                className="m-2 rounded-full shadow bg-white h-4 w-4 flex items-center justify-center" 
                                onClick={handleAddClick}>
                                  <i class="fas fa-plus-circle text-green-500"></i>
                                  </button>}
                            </div>
                          
                        );
                      })}
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
