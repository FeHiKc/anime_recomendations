import React from 'react';
import { Box } from '@mui/material';
import AnimeForm from '../components/AnimeForm';

const Home = () => {
    const handleAnimeSubmit = (anime) => {
        console.log('Submitted Anime:', anime);
    };

    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', padding: 4, color: '#fff' }}>
            <AnimeForm onSubmitAnime={handleAnimeSubmit} />
        </Box>
    );
};

export default Home;
