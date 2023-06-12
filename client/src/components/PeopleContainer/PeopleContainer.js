import { Stack } from "@mui/material";
import PersonCard from "../PersonCard/PersonCard";

const PeopleContainer = () => {
    return (
        <Stack spacing={2}>
            <PersonCard />
            <PersonCard />
        </Stack>
    )
}

export default PeopleContainer;