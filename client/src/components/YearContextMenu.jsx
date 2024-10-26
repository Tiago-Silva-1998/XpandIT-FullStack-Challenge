import React, {useEffect, useState} from "react"

export default function YearContextMenu({ onSelectYear, closePopup }) {
    const years = Array.from({length: 17}, (_, index) => 2016 - index)

    return (
        <div className="background" onClick={closePopup}>
            <div className="year-context-menu">
                <p>Select a year</p>
                {years.map((year) => (
                    <button key={year} onClick={() => onSelectYear(year)}>
                        {year}
                    </button>
                ))}
            </div>
        </div>
    )
}