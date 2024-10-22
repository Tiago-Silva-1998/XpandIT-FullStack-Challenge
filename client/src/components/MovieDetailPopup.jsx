import * as API from '../services/api.js'
import React, {useEffect, useState} from "react";
import closePNG from '../assets/close.png'

export default function MoviePopup({ id, closePopup }) {

    const [movie, setMovie] = useState({})

    useEffect(() => {
        if(id) API.getMovie(id, setMovie)
    }, [id])

    return (
        <div>
            { movie?
            (
                <div className="popup-container">
                    <div className="popup-body">
                        <h1>{movie.title}</h1>
                        <img className="close-button" src={ closePNG } onClick={closePopup}/>
                    </div>
                </div>
            )
                :
                (
                    <h1>Loading...</h1>
            ) }
        </div>
    )

}