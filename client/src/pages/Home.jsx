import React, {useState} from "react"
import MoveList from "../components/MovieList";
import MoviePopup from "../components/MovieDetailPopup";

export default function Home() {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState(undefined)

    return (
        <div className="base">
            <div className="rectangle"/>
            <h1 className="page-title">Movie Ranking</h1>
            <MoveList openPopup={() => setOpen(true)} changeId={setId}/>
            { open? <MoviePopup id={id} closePopup={() => setOpen(false)}/> : <> </> }
        </div>
    )
}