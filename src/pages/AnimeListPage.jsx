import React, { useEffect, useState } from 'react';
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
    Modal,
    TextareaAutosize,
    TextField,
    Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { client } from "../api/client";

const AnimeListPage = () => {
    const [animeList, setAnimeList] = useState([]);
    const [editAnime, setEditAnime] = useState(null); // Аниме для редактирования
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [addedBy, setAddedBy] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        client.get('/anime').then(({ data }) => {
            setAnimeList(data.data);
        });
    }, []);

    const handleEdit = (anime) => {
        setEditAnime(anime);
        setNewRating(anime.rating || 0);
        setNewComment(anime.comment || '');
        setNewStatus(anime.status || '');
        setAddedBy(anime.addedBy || '');
    };

    const handleSaveEdit = () => {
        const updatedList = animeList.map((item) =>
            item.id === editAnime.id
                ? {
                    ...item,
                    rating: newRating,
                    comment: newComment,
                    status: newStatus,
                    addedBy,
                }
                : item
        );
        setAnimeList(updatedList);
        localStorage.setItem('animeList', JSON.stringify(updatedList));
        setEditAnime(null);
    };

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
                            <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Added By</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Link</TableCell>
                            <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animeList.map((anime) => (
                            <TableRow key={anime.id}>
                                <TableCell>
                                    <img
                                        src={anime.coverImage}
                                        alt={anime.title}
                                        style={{ width: '50px', borderRadius: '5px' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.title}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.rating}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.averageScore}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.comment}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.status || 'Not specified'}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{anime.addedBy || 'Unknown'}</TableCell>
                                <TableCell>
                                    <Link
                                        href={`https://anilist.co/anime/${anime.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ color: '#1976d2' }}
                                    >
                                        🔗
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(anime)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



            {/* Modal for Editing */}
            <Modal
                open={Boolean(editAnime)}
                onClose={() => setEditAnime(null)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1c1c1c',
                        padding: 3,
                        borderRadius: 2,
                        width: 400,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Anime
                    </Typography>
                    <Typography gutterBottom>Rating:</Typography>
                    <Rating
                        value={newRating}
                        onChange={(e, newValue) => setNewRating(newValue)}
                        max={10}
                        precision={0.5}
                    />
                    <Typography gutterBottom>Comment:</Typography>
                    <TextareaAutosize
                        minRows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#333',
                            color: '#fff',
                        }}
                    />
                    <Typography gutterBottom>Status:</Typography>
                    <TextField
                        fullWidth
                        select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    >
                        <option value="">Not specified</option>
                        <option value="Смотрю">Смотрю</option>
                        <option value="Пауза">Пауза</option>
                        <option value="Дроп">Дроп</option>
                        <option value="ХУЕТА">ХУЕТА</option>
                    </TextField>
                    <Typography gutterBottom>Added By:</Typography>
                    <TextField
                        fullWidth
                        select
                        value={addedBy}
                        onChange={(e) => setAddedBy(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    >
                        <option value="">Unknown</option>
                        <option value="Влад">Влад</option>
                        <option value="Антон">Антон</option>
                        <option value="Даня">Даня</option>
                        <option value="Жека">Жека</option>
                    </TextField>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSaveEdit}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default AnimeListPage;
