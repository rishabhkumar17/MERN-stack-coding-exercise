import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './Movies.css';
import Header from './Header';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader, setLoader] = useState(false);

  const moviesData = {
    category: 'movies',
    language: 'kannada',
    genre: 'all',
    sort: 'voting',
  };
  const performAPICall = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `https://hoblist.com/api/movieList`,
        moviesData
      );
      setLoader(false);
      setMovies(response.data.result);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  return (
    <div>
      <Header />
      {isLoader ? (
        <Box className="loading">
          <CircularProgress />
          <h4>Loading Movies...</h4>
        </Box>
      ) : (
        <Grid container>
          <Grid item className="movie-grid">
            <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {movies.length > 0
                ? movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={3} key={movie._id}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Movies;
