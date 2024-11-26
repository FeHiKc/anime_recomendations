import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    Rating,
    TextareaAutosize,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import fetchAnimeByName from '../api/anilistAPI';

const AnimeForm = ({ onSubmitAnime }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const results = await fetchAnimeByName(searchQuery);
        setAnimeList(results);
    };

    const handleSelectAnime = (anime) => {
        setSelectedAnime(anime);
        setAnimeList([]); // Закрываем список после выбора
    };

    const handleSubmit = () => {
        if (!selectedAnime || !rating || !comment.trim()) {
            alert('Please select an anime, provide a rating, and write a comment.');
            return;
        }

        onSubmitAnime({
            ...selectedAnime,
            rating,
            comment,
        });

        // Показать уведомление об успехе
        setShowSnackbar(true);

        // Сбросить поля формы
        setSearchQuery('');
        setAnimeList([]);
        setSelectedAnime(null);
        setRating(0);
        setComment('');
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: 'auto', gap: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: '20px', color: '#fff' }}>
                Add Your Anime Review
            </Typography>

            {/* Search Anime */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    fullWidth
                    label="Search Anime"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        input: { color: '#fff' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#555' },
                            '&:hover fieldset': { borderColor: '#fff' },
                            '&.Mui-focused fieldset': { borderColor: '#ff4081' },
                        },
                    }}
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '12px' }}>
                    Search
                </Button>
            </form>

            {/* Anime List */}
            {animeList.length > 0 && (
                <List
                    sx={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#222',
                        borderRadius: '12px',
                        padding: '10px',
                        marginBottom: '20px',
                    }}
                >
                    {animeList.map((anime) => (
                        <ListItem
                            key={anime.id}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#333' },
                                backgroundColor: selectedAnime?.id === anime.id ? '#444' : 'transparent',
                            }}
                            onClick={() => handleSelectAnime(anime)}
                        >
                            {anime.title?.english || anime.title?.romaji}
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Rating */}
            <Box sx={{ marginTop: '20px' }}>
                <Typography gutterBottom sx={{ color: '#fff' }}>
                    Rating:
                </Typography>
                <Rating
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    max={10}
                    precision={0.5}
                />
            </Box>

            {/* Comment */}
            <Box sx={{ marginTop: '20px' }}>
                <Typography gutterBottom sx={{ color: '#fff' }}>
                    Comment:
                </Typography>
                <TextareaAutosize
                    minRows={4}
                    placeholder="Write your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #555',
                        borderRadius: '8px',
                        backgroundColor: '#222',
                        color: '#fff',
                    }}
                />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Link to="/anime-list" style={{ textDecoration: 'none', flex: 1 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                            width: '100%',
                            borderRadius: '12px',
                            border: '1px solid #ff4081',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#ff4081', color: '#222' },
                        }}
                    >
                        View Anime List
                    </Button>
                </Link>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{
                        flex: 1,
                        borderRadius: '12px',
                        backgroundColor: '#ff4081',
                        '&:hover': { backgroundColor: '#ff79a5' },
                    }}
                >
                    Submit
                </Button>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }} onClose={() => setShowSnackbar(false)}>
                    Потужно!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AnimeForm;
