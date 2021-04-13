import React, { Component } from 'react';

export class ComponentToPrintE extends React.PureComponent { 
getDay (dayDate) {
  let day;
  console.log(dayDate);
  switch (dayDate) {
    case "0":
      day = "Sunday";
      break;
    case "1":
      day = "Monday";
      break;
    case "2":
       day = "Tuesday";
      break;
    case "3":
      day = "Wednesday";
      break;
    case "4":
      day = "Thursday";
      break;
    case "5":
      day = "Friday";
      break;
    case "6":
      day = "Saturday";
  }
    return day;
}
  
    render() {
      return (
        <div
        style={{
          width: "29cm",
          height: "29.7cm",
          margin:0,
        }}
        >
        <div style={{ paddingBottom: "0px" }}> #0000000000000000000  no.of Attachments:0 date 00/00/00 Number: 10987/3/9/7/4 </div>
  
        <div style={{ padding: 0 }}>  
        <div style={{ 
          display:"inline-flex",
          margin: "0 auto",
          width: "100%",
          padding: "10px",
          paddingBottom: "50px",
          paddingLeft: "50px",
          textAlign: "center",
          justifyContent: "center",
         }}>
            <div style={{ paddingRight:"50",paddingTop:"20" }}>
                    <div>Kingdom of Saudi Arabia</div>
                    <div>Ministry of Education</div>
                    <div>King Khalid University</div>
            </div>

            <div
              style={{ margin:"0 auto"}}
            >

                <img src='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0023/6854/brand.gif?itok=PgKlfoqv' alt="kku-logo" style={{ width:"100px",height:"100px" }} />

            </div>

            <div>
                    <div>Deanship of student affairs</div>
                    <div>Agency of the cultural</div>
                    <div>and social activities</div>
                    <div>Department of students' clubs</div>
                
            </div>
        
        
        </div>
      


        <div 
        style={{ 
          display:'inline-flex',
          margin: '0 auto',
          width: '100%',
          padding: '30px',
          marginLeft: '15px',
          marginRight: '15px',
          marginTop: '15px',
          textAlign: 'center',
          justifyContent: 'center',
          borderStyle:'solid' ,
          borderRadius:'5px',
          borderColor: 'rgba(37, 209, 14, 0.644)',
        }}
        >
                    <table 
                       style={{
                        fontFamily: "Arial, Helvetica, sans-serif",
                        borderCollapse: "collapse",
                        width: "100%",
                        tableLayout: "fixed",
                        }}
                     >
                        <caption style={{ marginBottom:"15px" }}>Attachment Model (3) the plan of the club's..........Semester.</caption>
                        <tbody>
                            <tr
                            style = {{
                              border: "2px solid rgb(221, 221, 221)",
                              padding: "8px",
                              overflowWrap: "break-word",
                            }}
                            >
                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >No</th>

                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >Program name</th>

                          <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >Program Description</th>


                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >Program type (specialize, Scientific, Cultural, Sport, Social)	</th>

                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >program presenter</th>

                          <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >program coordinator</th>

                          <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >program location</th>


                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >day</th>


                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >date</th>


                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >time</th>

                            <th
                              style = {{
                                border: "2px solid rgb(221, 221, 221)",
                                padding: "8px",
                                overflowWrap: "break-word",
                                paddingTop: '12px',
                                paddingBottom: "12px",
                                textAlign: "center",
                                backgroundColor: "#4CAF50",
                                color: "white",
                              }}
                            >budget</th>


                            </tr>

                        {this.props.clubInfo.map((item,index) => (
  <tr
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>
                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{index+1}</td>

                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventName}</td>

                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventDesc}</td>

                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventType.name}</td>


                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventPresenter}</td>


                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventCoordinator}</td>


                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventPosition === undefined ? "There is no location"
                : 'latitude: '+item.eventPosition.lat+" longitude: "+item.eventPosition.lng}
                </td>


                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{this.getDay(item.evenDay)}</td>


                <td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.evenDate}</td>


<td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{new Date(parseInt(item.evenTime)).getHours()+":"+new Date(parseInt(item.evenTime)).getMinutes()}</td>

<td
                  style = {{
                    border: "2px solid rgb(221, 221, 221)",
                    padding: "8px",
                    overflowWrap: "break-word",
                  }}
                >{item.eventbudget}</td>

</tr>
                        ))}
                          
                           
                            </tbody>
                        </table>
        </div>
        </div>


        <div style = {{
           display:"inline-flex",
           margin: "0 auto",
           width: "100%",
           padding: "10px",
           paddingTop: "50px",
           textAlign: "center",
           justifyContent: "center",
        }}>
                <div style={{ paddingRight:"100px" }}>
                    <div>Pioneer</div>
                    <div>Name:</div>
                    <div>Signature:</div>
                </div>
                
                <div style={{ paddingLeft:"100px" }}> 
                <div>Authority supervisor</div>
                <div>Name:</div>
                <div>Signature:</div>
                </div>
                
            </div>


            <div style={{
              display:"inline-flex",
              margin: "0 auto",
              width: "100%",
              padding: "10px",
              paddingTop: "30px",
              textAlign: "center",
              justifyContent: "center",
            }}>
                <div style={{paddingRight: "130px"}}>
                    Stamp:
                </div>
                
                <div style={{paddingLeft: "100px" }}> 
                    <div>QR</div> 
                   <div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" height="100px" width="100px" />
                  </div> 

                </div>
                
            </div>

        </div>  
           
      );
    }
  }