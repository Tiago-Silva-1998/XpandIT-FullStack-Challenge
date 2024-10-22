import * as API from '../services/api.js'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";
import openPNG from '../assets/open.png'

export default function MovieList({ openPopup, changeId }) {

    const [count, setCount] = useState(50)
    const [hasMore, setHasMore] = useState(true)
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        API.getMoviesInit(setMovieList)
    }, []);

    const fetchMoreData = () => {
        API.getMovies(count, setCount, setMovieList, setHasMore)
    }

    const popup = (id) => {
        changeId(id)
        openPopup()
    }

    return (
        <div>
            <div className="movie-header">
                <p className="row-center">Ranking</p>
                <p className="row-left">Title</p>
                <p className="row-center">Year</p>
                <p className="row-left">Revenue</p>
            </div>
            <InfiniteScroll
                dataLength={movieList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                { movieList.map((movie) => {
                    return (
                        <div key={movie.id} className="movie-row">
                            <p className="row-center">{movie.info.ranking}</p>
                            <p className="row-left">{movie.info.title}</p>
                            <p className="row-center">{movie.info.year}</p>
                            <p className="row-left">
                                {Number(movie.info.revenue).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                            <img className="row-center" src={ openPNG } onClick={() => popup(movie.id) }/>
                        </div>
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}