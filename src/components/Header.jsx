import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" sx={{ marginBottom: '20px', backgroundColor: '#333' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Anime Review App
                </Typography>
                <Button component={Link} to="/" color="inherit">
                    Add Review
                </Button>
                <Button component={Link} to="/anime-list" color="inherit">
                    View Reviews
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
