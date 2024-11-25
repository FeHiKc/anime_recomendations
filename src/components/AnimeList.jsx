import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AnimeList = ({ animeList }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px' }}>
                Anime List
            </Typography>

            {animeList.map((anime, index) => (
                <Paper
                    key={index}
                    sx={{
                        padding: '20px',
                        marginBottom: '20px',
                        backgroundColor: '#222',
                        color: '#fff',
                        borderRadius: '12px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img
                            src={anime.coverImage}
                            alt={anime.titles.english}
                            style={{
                                width: '100px',
                                height: '150px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                            }}
                        />
                        <Box>
                            <Typography variant="h6">{anime.titles.english}</Typography>
                            <Typography variant="subtitle1">
                                {anime.titles.native !== 'N/A' && `(Ukrainian: ${anime.titles.native})`}
                            </Typography>
                            <Typography>Average Score: {anime.averageScore || 'N/A'}</Typography>
                            <Typography>My Rating: {anime.rating}</Typography>
                            <Typography>Comment: {anime.comment}</Typography>
                        </Box>
                    </Box>
                </Paper>
            ))}

            <Button
                onClick={() => navigate('/')}
                variant="contained"
                color="secondary"
                sx={{ marginTop: '20px', borderRadius: '12px' }}
            >
                Back to Form
            </Button>
        </Box>
    );
};

export default AnimeList;
