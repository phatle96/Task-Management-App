import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack } from "@mui/material";
import PropTypes from 'prop-types';

const Layout = ({ spacing }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack direction="column" justifyContent="space-between" spacing={spacing}>
                <Box sx={{ backgroundColor: "info.main" }}>
                    App Bar
                </Box>
                <Stack direction="row" spacing={spacing}>
                    <Box sx={{ backgroundColor: "secondary.main" }} >
                        Navigation Bar
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Stack direction ="column">
                            <Box sx={{backgroundColor: "info.main"}}>
                                Info
                            </Box>
                            <Grid2 container >
                                <Grid2 xs={0} sm={0} md={5} lg={4}
                                    sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" }, backgroundColor: "warning.main" }}>
                                    Section 1
                                </Grid2>
                                <Grid2 xs={0} sm={0} md={7} lg={8}
                                    sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" }, backgroundColor: "error.main" }}>
                                    <Grid2 container>
                                        <Grid2 xs={12} sm={6} md={6} lg={4} >
                                            <Box>test</Box>
                                        </Grid2>
                                        <Grid2 xs={12} sm={6} md={6} lg={4} >
                                            <Box>test</Box>
                                        </Grid2>
                                        <Grid2 xs={12} sm={6} md={6} lg={4}>
                                            <Box>test</Box>
                                        </Grid2>
                                        <Grid2 xs={12} sm={6} md={6} lg={4} >
                                            <Box>test</Box>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                                <Grid2 xs={12} sm={12} md={0} lg={0}
                                    sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" }, backgroundColor: "primary.main" }}>
                                    Responsive Section
                                </Grid2>
                            </Grid2>
                        </Stack>
                    </Box>
                </Stack>
                <Box sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" }, backgroundColor: "text.disabled" }}>
                    Bottom App Bar here
                </Box>
            </Stack>
        </Box>
    )
};


Layout.propTypes = {
    spacing: PropTypes.number
}

Layout.defaultProps = {
    spacing: 2,
}

export default Layout