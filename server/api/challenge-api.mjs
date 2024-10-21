export default function (services) {
    const getAllMovies = async (req, rsp) => {
        const movies = await services.getAllMovies(req.query.from, req.query.size)
        rsp.json(movies)
    }
    const getMovieDetails = async (req, rsp) => {
        const movie = await services.getMovieDetails(req.query.id)
        rsp.json(movie)
    }
    const getTopMoviesByRevenue = async (req, rsp) => {
        const movies = await services.getTopMoviesByRevenue(req.query.year)
        rsp.json(movies)
    }

    if (services) {
        return {
            getAllMovies,
            getMovieDetails,
            getTopMoviesByRevenue
        }
    }
}