// src/components/MovieList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../api/tmdb';
import './MovieList.css'; // CSS 파일 임포트

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await tmdb.get('/movie/popular', {
        params: { page, language: 'ko-KR' },
      });
      const fetchedMovies = response.data.results;

      // 중복된 영화 데이터 제거
      setMovies((prevMovies) => {
        // 기존 영화 데이터와 새로 불러온 영화 데이터를 합칩니다.
        const updatedMovies = [...prevMovies, ...fetchedMovies];
        // 중복된 영화를 제거하고 고유한 영화만 반환합니다.
        const uniqueMovies = updatedMovies.filter((movie, index, self) =>
          index === self.findIndex((m) => (
            m.id === movie.id
          ))
        );
        return uniqueMovies;
      });

      // 전체 페이지 수 업데이트
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('영화 목록을 가져오는 동안 에러 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
      // 다음 페이지 로드
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, page, totalPages]);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // 페이지가 처음 로드될 때 초기 데이터 로드
    if (page === 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <div>
      <div className="header">영화 목록 by 11조</div>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>평점: {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="loading">로딩 중...</div>}
    </div>
  );
};

export default MovieList;
