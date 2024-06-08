// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetail.css'; // CSS 파일 임포트

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5428e1a81aae4cfa7f3247e9e3c68e5e&language=ko-KR`);
        if (!response.ok) {
          throw new Error('영화 데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('영화 데이터를 가져오는 동안 에러 발생:', error);
      }
    };

    fetchData();
  }, [id]);

  const openHomepage = () => {
    if (movie && movie.homepage) {
      window.open(movie.homepage, '_blank');
    }
  };

  const openYoutubeTrailer = async () => {
    if (movie) {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(movie.title)}%20트레일러&key=AIzaSyDBETrVTrf7S6jSoBHcID1RzHkyqkjzPuU`);
        if (!response.ok) {
          throw new Error('유튜브 데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        if (data.items.length > 0) {
          const topVideoId = data.items[0].id.videoId;
          const trailerURL = `https://www.youtube.com/watch?v=${topVideoId}`;
          window.open(trailerURL, '_blank');
        } else {
          console.error('해당 영화의 트레일러를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('유튜브 API를 호출하는 동안 에러 발생:', error);
      }
    }
  };

  if (!movie) return <div className="movie-detail">Loading...</div>;

  return (
    <div className="movie-detail">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average}</p>
      <div className="buttons">
        <button onClick={openHomepage}>홈페이지</button>
        <button onClick={openYoutubeTrailer}>유튜브 트레일러</button>
      </div>
      <div className="back-button">
        <Link to="/">목록으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
