import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mockAnimeList = [
    {
        id: 1,
        title: { english: 'Naruto', romaji: 'NARUTO', native: 'ナルト' },
        rating: 8.5,
        comment: 'An amazing classic!',
        url: 'https://anilist.co/anime/20',
        averageScore: 79,
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20.jpg',
    },
    {
        id: 2,
        title: { english: 'One Piece', romaji: 'ONE PIECE', native: 'ワンピース' },
        rating: 9.0,
        comment: 'Legendary journey!',
        url: 'https://anilist.co/anime/21',
        averageScore: 85,
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21.jpg',
    },
];

const AnimeListPage = () => {
    const [animeList] = useState(mockAnimeList);
    const navigate = useNavigate();

    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Anime List
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ marginBottom: 3, backgroundColor: '#1976d2' }}
            >
                Back to Home
            </Button>
            <TableContainer component={Paper} sx={{ backgroundColor: '#1c1c1c' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#fff' }}>Image</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Title</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Rating</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Average Score</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Comment</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animeList.map((anime) => (
                            <TableRow key={anime.id}>
                                <TableCell>
                                    <img
                                        src={anime.image}
                                        alt={anime.title.english}
                                        style={{ width: '50px', borderRadius: '5px' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    {anime.title.english} ({anime.title.romaji})
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.rating}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.averageScore}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.comment}</TableCell>
                                <TableCell>
                                    <Link
                                        href={anime.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ color: '#1976d2' }}
                                    >
                                        🔗
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AnimeListPage;
