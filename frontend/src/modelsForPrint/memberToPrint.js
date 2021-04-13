import React, { Component } from 'react';

export class ComponentToPrintM extends React.PureComponent {
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
                        <caption style={{ marginBottom:"15px" }}>model (4) work team and members of the ......... club.</caption>
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
                            >Name</th>

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
                            >uni-ID</th>


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
                            >task</th>

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
                            >level</th>

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
                            >phone number</th>

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
                            >college/department/major</th>

                            </tr>


                        {this.props.members.map((item,index) => (
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
>{item.memberInfo.name}</td>

<td
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>{item.memberInfo.uniID}</td>

<td
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>{item.occupation}</td>

<td
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>{item.memberInfo.level}</td>

<td
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>{item.memberInfo.phone}</td>


<td
  style = {{
    border: "2px solid rgb(221, 221, 221)",
    padding: "8px",
    overflowWrap: "break-word",
  }}
>{item.memberInfo.college}</td>


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