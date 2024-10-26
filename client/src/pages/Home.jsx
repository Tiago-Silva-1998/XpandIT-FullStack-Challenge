import React, {useState} from "react"
import MoveList from "../components/MovieList"
import MoviePopup from "../components/MovieDetailPopup"
import Top10Movies from "../components/Top10Movies";
import YearContextMenu from "../components/YearContextMenu";

export default function Home() {

    const [open, setOpen] = useState(false)
    const [id, setId] = useState(undefined)
    const baseContent = <MoveList openPopup={() => setOpen(true)} changeId={setId}/>
    const [content, setContent] = useState(baseContent)

    const [yearSelectPopup, setYearSelectPopup] = useState(false)
    const [activeButton, setActiveButton] = useState(undefined);

    const handleClick = (button) => {
        if (activeButton === button) {
            setContent(baseContent)
            setActiveButton(undefined)
            return
        }
        if (button === 'top10') {
            setContent(<Top10Movies openPopup={() => setOpen(true)} changeId={setId}/>)
            setActiveButton('top10')
        } else if (button === 'top10year') {
            setActiveButton('top10year')
            setYearSelectPopup(true)
        }
    }

    const handleYearSelect = (year) => {
        setContent(<Top10Movies openPopup={() => setOpen(true)} changeId={setId} year={year} />);
        setYearSelectPopup(false);
    }

    return (
        <div className="base">
            <div className="rectangle"/>
            <h1 className="page-title">Movie Ranking</h1>

            <div className="buttons">
                <div>
                    <button
                        onClick={() => handleClick('top10')}
                        className={activeButton === 'top10' ? 'active' : ''}
                    >Top 10 Revenue
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleClick('top10year')}
                        className={activeButton === 'top10year' ? 'active' : ''}
                    >Top 10 Revenue per Year
                    </button>
                    {yearSelectPopup ?
                        <YearContextMenu onSelectYear={handleYearSelect} closePopup={() => setYearSelectPopup(false)}/>
                        : <> </>
                    }
                </div>
            </div>
            {content}

            {open ? <MoviePopup id={id} closePopup={() => setOpen(false)}/> : <> </>}
        </div>
    )
}