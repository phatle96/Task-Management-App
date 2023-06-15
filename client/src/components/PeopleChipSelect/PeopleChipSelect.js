import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { DataContext } from '../../context/DataContext';


export default function PeopleChipSelect({ setSelectPeople }) {

    const [value, setValue] = useState([]);

    const { people } = useContext(DataContext)


    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return (
        <Stack spacing={3} sx={{ width: "100%" }}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={people}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue);
                    setSelectPeople(newValue)
                }}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            avatar={<Avatar sx={{ bgcolor: stringToColor(`${option.name}`) }}>{option.default_avatar}</Avatar>}
                            label={option.name}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Assign task"
                        placeholder="People"
                    />
                )}
            />
        </Stack>
    );
}
