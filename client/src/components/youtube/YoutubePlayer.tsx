import React from 'react';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { removeFavoriteVideo, addFavoriteVideo } from '../../sdk/user';
import useAuth from '../../context/AuthContext';

export interface Props {
  id: string;
  title: string;
  getFavoriteVideos: () => void;
  isSearchedVideoFavorited?: (searchedVideoId: string) => boolean;
}

const YoutubePlayer = (props: Props) => {
  const { token } = useAuth();

  async function handleAddFavorite(e: React.MouseEvent<HTMLElement>) {
    if (token) {
      await addFavoriteVideo(e.currentTarget.id, token);
      props.getFavoriteVideos();
    }
  }
  async function handleRemoveFavorite(e: React.MouseEvent<HTMLElement>) {
    if (token) {
      await removeFavoriteVideo(e.currentTarget.id, token);
      props.getFavoriteVideos();
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, m: '0.5rem' }}>
        <CardMedia
          component='iframe'
          width='560'
          height='315'
          image={`https://www.youtube.com/embed/${props.id}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          frameBorder='0'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          {props.isSearchedVideoFavorited ? (
            props.isSearchedVideoFavorited(props.id) ? (
              <Button size='small' id={props.id} onClick={handleRemoveFavorite}>
                Remove from Favorites
              </Button>
            ) : (
              <Button size='small' id={props.id} onClick={handleAddFavorite}>
                Add to Favorites
              </Button>
            )
          ) : (
            <Button size='small' id={props.id} onClick={handleRemoveFavorite}>
              Remove from Favorites
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default YoutubePlayer;
