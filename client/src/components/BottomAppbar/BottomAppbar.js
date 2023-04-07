import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';



export default function BottomAppbar() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{
            display: { lg: "none", md: "none", sm: "block", xs: "block" },
            position: 'fixed', bottom: 0, left: 0, right: 0,
            borderTop: 1, borderColor: "gray"
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="list" icon={<FormatListBulletedIcon />} />
                <BottomNavigationAction label="doing" icon={<SentimentNeutralIcon />} />
                <BottomNavigationAction label="complete" icon={<EmojiEmotionsIcon />} />
                <BottomNavigationAction label="add" icon={<AddIcon />} />
            </BottomNavigation>
        </Box>
    );
}