import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react';

export default function CountrySelector({ value, handleOnChange, countries }) {
    console.log('abc', typeof countries);
    return (
        <FormControl>
            <InputLabel htmlFor="country-selector" shrink>
                Chọn Quốc gia: 
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={
                    {
                        name: 'country',
                        id: 'country-selector'
                    }
                }
            >
                {
                    countries.map((country) => {
                        return (
                            <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                                {country.Country}
                            </option>
                        );
                    })
                }
            </NativeSelect>
        </FormControl>
    );
}