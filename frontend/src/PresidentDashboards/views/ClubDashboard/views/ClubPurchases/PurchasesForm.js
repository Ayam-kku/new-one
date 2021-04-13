import React, { useState, useEffect, useMemo } from 'react'
import {useDropzone} from 'react-dropzone';
import { Divider, Grid, InputAdornment, } from '@material-ui/core';
import Controls1 from "./Controls";
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../controls/useForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { getEvent, uploadDataToDB } from './PurchasesService'




const initialFValues = {
  eventName: '',
  product: '',
  price: 0,
  Userimg:'student',
  
}

export default function PurchasesForm() {
    
    const theme = createMuiTheme({
        palette: {
          primary: green,
        },
      });
 ////////////////////////////////////////////////////////////////////////////////////////

//for image
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const thumbsContainer = {
      display: 'flex',
      justifyContent: "center",
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    };
    
    const thumb = {
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 130,
      height: 130,
      padding: 2,
      boxSizing: 'border-box'
    };
    
    const thumbInner = {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden'
    };
    
    const img = {
      display: 'block',
      width: 'auto',
      height: '100%'
    };
  
    const style = useMemo(() => ({
      ...baseStyle,
    }));
  
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      },
      maxFiles:1,
      init: function() {
            this.on("maxfilesexceeded", function(file) {
                  this.removeAllFiles();
                  this.addFile(file);
            });
      }   
    });
  
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ));
 ////////////////////////////////////////////////////////////////////////////////////////////


     const [events, setEvents] = useState([]);
     const [values, setValues] = useState(initialFValues);

    useEffect(() => {
        getEvent().then((u) =>{ 
            setEvents(u)});
    }, []);

    const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
          ...values,
          [name]: value
      })
  }
  const handleSubmit = e => {
    e.preventDefault()
    let formd = new FormData();
        formd.append("Userimg",files[0]);     
        formd.append("eventName",values.eventName);
        formd.append("product",values.product);
        formd.append("price",values.price);
        uploadDataToDB(formd)
    setValues(initialFValues)
    

    }


    return (
         <form onSubmit={handleSubmit} >
                <div className="container">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>Drag or click to select image for new invoice</p>
                    </div>
                        <aside style={thumbsContainer}>
                          {thumbs}
                        </aside>
                </div>
                <div className="w-full grid">
                    <div className=" w-full mb-3 mt-3">  
                      <Controls1.Select
                              name="eventName"
                              label="Choose Evnent"
                              value={values.eventName}
                              onChange={handleInputChange}
                              options={events}
                          />
                    </div>
                    <div className=" w-full mb-3">
                      <Controls.Input
                        name="product"
                        label="Product Name"
                        value={values.product}
                        onChange={handleInputChange}
                        variant="outlined"
                        />
                    </div>
                    <div className="w-full mb-3">
                      <Controls.Input
                        name="price"
                        label="Product Price"
                        value={values.price}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        variant="outlined"
                        />
                    </div>
               </div>
                    <div>
                    <ThemeProvider theme={theme}>
                        <Controls.Button
                            color="primary"
                            type="submit"
                            text="Submit" />
                        </ThemeProvider>
                        <Controls.Button
                            text="Reset"
                            color="default"
                            //onClick={resetForm}
                             />
                    </div>
                    
                    
            
        </form>
    )
}
