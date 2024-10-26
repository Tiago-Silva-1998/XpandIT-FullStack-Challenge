import * as API from '../services/api.js'
import React, {useEffect, useState} from "react";
import closePNG from '../assets/close.png'

export default function MoviePopup({ id, closePopup }) {

    const [movie, setMovie] = useState(undefined)

    useEffect(() => {
        if(id) API.getMovie(id, setMovie)
    }, [id])

    console.log(movie)
    return (
        <div className="background" onClick={closePopup}>
            { movie?
            (
                <div className="popup-container">
                    <div className="popup-body">
                        <p className="movie-title">{movie.info.title}</p>
                        <p className="category">Year</p>
                        <p className="movie-info">{movie.info.year}</p>
                        <p className="category">Genre</p>
                        <p className="movie-info">{movie.info.genre}</p>
                        <p className="category">Description</p>
                        <p className="movie-info">{movie.info.description}</p>
                        <div className="director-actors-container">
                            <div className="director-container">
                                <p className="category">Director</p>
                                <p className="director-actors">{movie.info.director}</p>
                            </div>
                            <div className="actor-container">
                                <p className="category">Actors</p>
                                <p className="director-actors">{movie.info.actors}</p>
                            </div>
                        </div>
                        <p className="category">Runtime</p>
                        <p className="movie-info">{movie.info.runtime} mins</p>
                        <p className="category">Rating</p>
                        <p className="movie-info">{movie.info.rating}</p>
                        <p className="category">Votes</p>
                        <p className="movie-info">{movie.info.votes}</p>
                        <p className="category">Revenue</p>
                        <p className="movie-info">{movie.info.revenue}</p>
                        <img className="close-button" src={closePNG} onClick={closePopup}/>
                    </div>
                </div>
            )
                :
                (
                    <h1>Loading...</h1>
                )}
        </div>
    )

}
