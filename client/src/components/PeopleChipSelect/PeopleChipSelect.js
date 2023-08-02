import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createPerson, initPerson, selectAllPeople } from '../../features/people/peopleSlice';
import { handlePeopleField } from '../../features/fields/fieldsSlice';
import { stringToPastelColor } from '../../utils/color';


const filter = createFilterOptions();

export default function PeopleChipSelect({ selectPeople, setSelectPeople }) {

    const dispatch = useDispatch();
    const people = useSelector(selectAllPeople)
    const personCreated = useSelector((state) => state.people.create.response)
    const personCreateStatus = useSelector((state) => state.people.create.status)

    useEffect(() => {
        switch (personCreateStatus) {
            case 'succeeded': {
                setSelectPeople([...selectPeople, personCreated])
                dispatch(initPerson())
                break
            }
        }
    }, [personCreateStatus])

    return (
        <Stack spacing={3} sx={{ width: "100%" }} >
            <Autocomplete
                sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "whitesmoke", borderColor: "lightgrey" }
                }}
                multiple
                id="tags-standard"
                value={selectPeople}
                onChange={(event, newValue) => {
                    dispatch(handlePeopleField('on'))
                    const isAddNew = newValue ? newValue.filter(person => person.inputValue) : []
                    if (isAddNew.length === 0) {
                        setSelectPeople(newValue)
                    } else {
                        const payload = {
                            type: 'person',
                            payload: {
                                name: isAddNew[0].inputValue
                            }
                        }
                        dispatch(createPerson(payload))
                    }
                }}
                options={people}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option.name;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.name;
                    }
                    // Regular option
                    return option.name;
                }}
                isOptionEqualToValue={(option, value) => option.person_id === value.person_id}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    const isExistingValue = selectPeople.some((selected) => inputValue === selected.name)
                    if (inputValue !== '' && !isExisting && !isExistingValue) {
                        filtered.push({
                            inputValue,
                            name: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                handleHomeEndKeys
                filterSelectedOptions
                autoHighlight
                clearOnBlur
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            avatar={<Avatar sx={{ bgcolor: stringToPastelColor(option.person_id, 'hex') }}>{option.default_avatar}</Avatar>}
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
