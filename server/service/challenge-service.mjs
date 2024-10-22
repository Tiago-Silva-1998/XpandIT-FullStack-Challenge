export default function(data) {
    const getAllMovies = async (from = 0, size = 50) => {
        return await data.getAllMovies(Number(from), Number(size))
    }
    const getMovieDetails = async (id) => {
        return await data.getMovieDetails(id)
    }
    const getTopMoviesByRevenue = async (year, size = 10) => {
        return await data.getTopMoviesByRevenue(Number(year), Number(size))
    }

    if (data) {
        return {
            getAllMovies,
            getMovieDetails,
            getTopMoviesByRevenue
        }
    }
}