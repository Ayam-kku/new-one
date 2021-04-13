import { FormControl, FormLabel, RadioGroup as RG, FormControlLabel, Radio } from '@material-ui/core';
import React from 'react'

export default function RadioGroup(props) {
    
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
                        <FormLabel>
                            {label}
                        </FormLabel>
                        <RG 
                            row
                            name={name}
                            value={value}
                            onChange={onChange}>
                                { items.map(
                                        (item, index) =>(
                                            <FormControlLabel value={item.id} key={item.id} control={<Radio />} label={item.title} />
                                        )
                                    ) }
                        </RG>
        </FormControl>
    )
}
