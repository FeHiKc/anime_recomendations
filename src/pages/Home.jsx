import React from 'react';
import {Box} from '@mui/material';
import AnimeForm from '../components/AnimeForm';
import {client} from "../api/client";

const Home = () => {
    const handleAnimeSubmit = async (anime) => {
        console.log('Submitted Anime:', anime);
        const {data} = await client.post('/anime', {
            id: anime.id,
            title: anime.title.english,
            averageScore: anime.averageScore,
            coverImage: anime.coverImage,
            rating: anime.rating,
            comment: anime.comment,
        });

    };

    return (
        <Box sx={{backgroundColor: '#121212', minHeight: '100vh', padding: 4, color: '#fff'}}>
            <AnimeForm onSubmitAnime={handleAnimeSubmit}/>
        </Box>
    );
};

export default Home;
