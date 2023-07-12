import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectAllPeople } from '../../features/people/peopleSlice';
import { handlePeopleField } from '../../features/fields/fieldsSlice';



export default function PeopleChipSelect({ selectPeople, setSelectPeople }) {

    const dispatch = useDispatch();
    const people = useSelector(selectAllPeople)
    const [inputChange, setInputChange] = useState('')

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
        <Stack spacing={3} sx={{ width: "100%" }} >
            <Autocomplete
                multiple
                id="tags-standard"
                options={people}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.person_id === value.person_id}
                value={selectPeople}
                filterSelectedOptions
                autoHighlight
                autoSelect={inputChange}
                onInputChange={(event, value) => { setInputChange(value) }}
                onChange={(event, newValue) => {
                    setSelectPeople(newValue)
                    dispatch(handlePeopleField('on'))
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
