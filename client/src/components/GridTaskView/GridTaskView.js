import * as React from 'react';
import {Box} from '@mui/material/';
import {Grid} from '@mui/material/';
import PropTypes from 'prop-types';


const GridTaskView = ({array}) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                {[1,2,3,4,5,6].map((i) => (
                    <Grid item xs={12} sm={6} md={4} >
                        x
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

GridTaskView.propTypes = {
    array: PropTypes.number
}

GridTaskView.defaultProps = {
    array: 6
}

export default GridTaskView