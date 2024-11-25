import React, { useState } from 'react';
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
    const [showSnackbar, setShowSnackbar] = useState(false); // Для сообщения "Потужно"

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

            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px', borderRadius: '12px' }}
            >
                Submit
            </Button>

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
