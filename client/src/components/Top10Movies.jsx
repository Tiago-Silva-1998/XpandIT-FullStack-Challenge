import * as API from '../services/api.js'
import React, {useEffect, useState} from "react"
import openPNG from "../assets/open.png";

export default function Top10Movies({ openPopup, changeId, year }) {

    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        API.getTop10Movies(year, setMovieList)
    }, [year])

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

            {movieList.map((movie) => {
                return (
                    <div key={movie.id} className="movie-row">
                        <p className="row-center">{movie.info.ranking}</p>
                        <p className="row-left">{movie.info.title}</p>
                        <p className="row-center">{movie.info.year}</p>
                        <p className="row-left">{movie.info.revenue}</p>
                        <img className="row-center" src={openPNG} onClick={() => popup(movie.id)}/>
                    </div>
                )
            })}
        </div>
    )
}