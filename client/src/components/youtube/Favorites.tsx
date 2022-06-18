import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { listFavorites, YoutubeResponse } from '../../sdk/youtube';
import { removeFavoriteVideo } from '../../sdk/user';
import useAuth from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { token, loggedIn } = useAuth();
  const navigate = useNavigate();
  const [favoriteVideos, setFavoriteVideos] = useState<YoutubeResponse>();

  const getFavoriteVideos = async () => {
    if (token) {
      const favorites = await listFavorites(token);
      setFavoriteVideos(favorites);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
    getFavoriteVideos();
  }, []);

  async function handleRemoveFavorite(e: React.MouseEvent<HTMLElement>) {
    if (token) {
      await removeFavoriteVideo(e.currentTarget.id, token);
      getFavoriteVideos();
    }
  }

  return (
    <Container>
      <Box>
        {favoriteVideos?.items.map((favVideo) => (
          <Box>
            <Card sx={{ maxWidth: 345, m: '0.5rem' }}>
              <CardMedia
                component='iframe'
                width='560'
                height='315'
                image={`https://www.youtube.com/embed/${favVideo.id}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                frameBorder='0'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {favVideo.snippet.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  id={favVideo.id}
                  onClick={handleRemoveFavorite}
                >
                  Remove from Favorites
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Favorites;
