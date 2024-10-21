import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: process.env.ELASTICSEARCH_URL })
const indexName = 'movies'

export const getAllMovies = async (from = 0, size = 10) => {
    try {
        const body = await client.search({
            index: indexName,
            from: from,
            size: size,
            sort: {
                vote_average: { order: 'desc' },
            },
            query: {
                match_all: {},
            },
        })

        return body.hits.hits.map((hit, idx) => {
            return {
                id: hit._id,
                info: {
                    ranking: idx + from + 1,
                    title: hit._source.title,
                    year: hit._source.year,
                    revenue: hit._source.revenue === 0? 'No Data' : hit._source.revenue,
                }
            }
        })
    } catch (error) {
        console.error('Error retrieving movies:', error)
        throw error
    }
}

export const getMovieDetails = async (id) => {
    try {
        const { body } = await client.get({
            index: indexName,
            id,
        })

        return body._source
    } catch (error) {
        if (error.meta.statusCode === 404) {
            console.error('Movie not found:', id)
            return null
        }
        console.error('Error retrieving movie details:', error)
        throw error
    }
}

export const getTopMoviesByRevenue = async (year, size = 10) => {
    try {
        const query = year ? { match: { year } } : { match_all: {} }
        const { body } = await client.search({
            index: indexName,
            size: 0,
            body: {
                query,
                aggs: {
                    top_movies: {
                        terms: {
                            field: 'revenue',
                            size,
                            order: { _key: 'desc' },
                        },
                    },
                },
            },
        })

        return body.aggregations.top_movies.buckets
    } catch (error) {
        console.error(`Error retrieving top movies by revenue${year ? ` for year ${year}` : ''}:`, error)
        throw error
    }
}
