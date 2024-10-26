const api = 'http://localhost:8080/api'
const movies = '/movies'

export function getMoviesInit(setMovieList) {
    fetch(`${api}${movies}`)
        .then(response =>
            response.json()
                .then(data => {
                    setMovieList([...data])
                })
        )
}

export function getMovies(from, setCount, setMovieList, setHasMore) {
    fetch(`${api}${movies}?from=${from}`)
        .then(response =>
            response.json()
                .then(data => {
                    setMovieList((list) => [...list, ...data])
                    setCount((count) => count + 50)
                    data.length < 50 && setHasMore(false)
                })
        )
}

export function getMovie(id, setMovie) {
    fetch(`${api}${movies}/${id}`)
        .then(response =>
            response.json()
                .then(data => {
                    setMovie(data)
                })
        )
}

export function getTop10Movies(year, setMovieList) {
    fetch(`${api}/top?year=${year}`)
        .then(response =>
            response.json()
                .then(data => {
                    setMovieList([...data])
                })
        )
}