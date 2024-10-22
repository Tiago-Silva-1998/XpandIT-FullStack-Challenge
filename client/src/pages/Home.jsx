import React, {useEffect, useState} from "react"
import {useTable} from "react-table"
import InfiniteScroll from "react-infinite-scroll-component"

export default function Home() {

    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/movies?from=${count}`)
            .then(response =>
                response.json()
                    .then(data => {
                        setMovieList((list) => [...list, ...data])
                        setCount(count + 50)
                    })
            )
    }, []);

    const fetchMoreData = () => {
        fetch(`http://localhost:8080/api/movies?from=${count}`)
            .then(response =>
                response.json()
                    .then(data => {
                        setMovieList((list) => [...list, ...data])
                        setCount(count + 10)
                        data.length < 10 && setHasMore(false)
                    })
            )
    }

    return (
        <div className="base">
            <div className="rectangle"/>
            <h1 className="page-title">Movie Ranking</h1>
            <div>
                <div className="movie-header">
                    <p>Ranking</p>
                    <p>Title</p>
                    <p>Year</p>
                    <p>Revenue</p>
                </div>
                <InfiniteScroll
                    dataLength={movieList.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className="loader">Loading...</h4>}
                >
                {movieList.map((movie) => {
                        return (
                            <div key={movie.id} className="movie-row">
                                <p>{movie.info.ranking}</p>
                                <p>{movie.info.title}</p>
                                <p>{movie.info.year}</p>
                                <p>${movie.info.revenue}</p>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}