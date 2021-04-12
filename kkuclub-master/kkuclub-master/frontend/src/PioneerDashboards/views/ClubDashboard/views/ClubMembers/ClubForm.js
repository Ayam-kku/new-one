import React, { useState, useEffect } from 'react'
import { Divider, Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../controls/useForm';
import { getStudentUser, postMemoer, getCommittee } from './clubService';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';



const occupationItems = [
    { id: 'Vice President', title: 'Vice President' },
    { id: 'Committee President', title: 'Committee President' },
    { id: 'Committee Member', title: 'Committee Member' },
    { id: 'Member', title: 'Member' },
]


const initialFValues = {
    memberInfo: '',
    occupation: 'Member',
    committee:'{"":""}',
    createDate: new Date(),   
}

export default function ClubForm() {
    
    const theme = createMuiTheme({
        palette: {
          primary: green,
        },
      });

    const [users, setusers] = useState([]);
    const [committees, setCommittees] = useState([]);
    
    useEffect(() => {
        getCommittee().then((u) =>{ 
            setCommittees(u)});
        getStudentUser().then((u) =>{ 
            setusers(u)});
    }, []);
        
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('memberInfo' in fieldValues)
            temp.memberInfo = fieldValues.memberInfo ? "" : "This field is required."
        if ('occupation' in fieldValues)
            temp.occupation = fieldValues.occupation ? "" : "This field is required."
        if ('committee' in fieldValues )
            temp.committee = fieldValues.committee ? "" : "This field is required."
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {
            
            let a = {
                memberInfo: JSON.parse(values.memberInfo),
                occupation: values.occupation,
                committee: JSON.parse(values.committee),
                createDate: new Date(),
            }
            let payload = {
                member: a
              };
            postMemoer(payload)
            resetForm()
        }
        
        
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Select
                        name="memberInfo"
                        label="Choose Member"
                        value={values.memberInfo}
                        onChange={handleInputChange}
                        options={users}
                        error={errors.memberInfo}
                    />
                    {values.memberInfo !== ""  &&(
                        <>
                        <Controls.Input
                        label={"University ID"}
                        value={JSON.parse(values.memberInfo).uniID}/>

                        <Controls.Input
                        label={"Level"}
                        value={JSON.parse(values.memberInfo).level}/>

                        <Controls.Input
                        label={"Phone Number"}
                        value={JSON.parse(values.memberInfo).phone}/>

                        <Controls.Input
                        label={"Email"}
                        value={JSON.parse(values.memberInfo).email}/>

                        <Controls.Input
                        label={"Major"}
                        value={JSON.parse(values.memberInfo).major}/>
                        </>
                        
                        
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="occupation"
                        label="Occupation:"
                        value={values.occupation}
                        onChange={handleInputChange}
                        items={occupationItems}
                    />
                    {(values.occupation !== "Member"  && values.occupation !=='Vice President') &&(
                        
                         <Controls.Select
                            name="committee"
                            label="Choose Committee"
                            value={values.committee}
                            onChange={handleInputChange}
                            options={committees}
                            error={errors.committee}
                        />
                        
                        
                        
                    )}
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
                            onClick={resetForm} />
                    </div>
                    </Grid>
                    </Grid>
                    
                    
            
        </Form>
    )
}
