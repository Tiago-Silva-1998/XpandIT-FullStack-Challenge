import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: process.env.ELASTICSEARCH_URL })
const indexName = 'movies'

export const getAllMovies = async (from = 0, size = 50) => {
    const response = await client.search({
        index: indexName,
        from: from,
        size: size,
        query: { range: { revenue: { gt: 0 } } },
        sort: { vote_average: { order: 'desc' } }
    })

    return response.hits.hits.map((hit, idx) => {
        return {
            id: hit._id,
            info: {
                ranking: idx + from + 1,
                title: hit._source.title,
                year: dateFormat(hit._source.release_date.split("-")[0]),
                revenue: moneyFormat(hit._source.revenue)
            }
        }
    })
}

export const getMovieDetails = async (id) => {
    const response = await client.get({
        index: indexName,
        id: id
    })

    return {
        id: response._id,
        info: {
            title: response._source.title,
            year: dateFormat(response._source.release_date),
            genre: response._source.genres.replace(' ', ', '),
            description: response._source.overview,
            director: response._source.director,
            actors: response._source.cast,
            runtime: response._source.runtime,
            rating: response._source.vote_average,
            votes: response._source.vote_count,
            revenue: moneyFormat(response._source.revenue)
        }
    }
}

export const getTopMoviesByRevenue = async (year, size = 10) => {
    const startDate = `${year}-01-01`
    const endDate = `${year}-12-31`
    const yearFilter = year ? { range: { release_date: { gte: startDate, lte: endDate } } } : { match_all: {} }
    const response = await client.search({
        index: indexName,
        size: size,
        query: yearFilter,
        sort: { revenue: { order: 'desc' } },
    })

    return response.hits.hits.map((hit, idx) => {
        return {
            id: hit._id,
            info: {
                ranking: idx + 1,
                title: hit._source.title,
                year: dateFormat(hit._source.release_date.split("-")[0]),
                revenue: moneyFormat(hit._source.revenue)
            }
        }
    })
}

const moneyFormat = (money) => {
    return Number(money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    })
}

const dateFormat = (date) => {
    return date.split('-')[0]
}
