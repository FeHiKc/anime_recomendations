import React from 'react';
import { Card, CardContent, Typography, Rating, Link, CardMedia } from '@mui/material';

const AnimeCard = ({ anime }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#222',
                color: '#fff',
                borderRadius: '12px',
                display: 'flex',
                gap: 2,
                marginBottom: '10px',
            }}
        >
            <CardMedia
                component="img"
                image={anime.coverImage?.medium}
                alt={anime.title?.english || anime.title?.romaji}
                sx={{ width: 100, borderRadius: '12px 0 0 12px' }}
            />
            <CardContent>
                <Typography variant="h6">{anime.title?.english || anime.title?.romaji}</Typography>
                {anime.rating && <Rating value={anime.rating} readOnly max={10} precision={0.5} />}
                {anime.comment && <Typography variant="body2">{anime.comment}</Typography>}
                <Link href={anime.siteUrl} target="_blank" rel="noopener noreferrer" sx={{ color: '#ff4081' }}>
                    🔗
                </Link>
            </CardContent>
        </Card>
    );
};

export default AnimeCard;
