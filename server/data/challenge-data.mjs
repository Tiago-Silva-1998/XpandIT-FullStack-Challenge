import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: process.env.ELASTICSEARCH_URL })
const indexName = 'movies'

export const getAllMovies = async (from = 0, size = 50) => {
    const response = await client.search({
        index: indexName,
        from: from,
        size: size,
        sort: { vote_average: { order: 'desc' } },
        query: { range: { revenue: { gt: 0 } } }
    })

    return response.hits.hits.map((hit, idx) => {
        return {
            id: hit._id,
            info: {
                ranking: idx + from + 1,
                title: hit._source.title,
                year: hit._source.release_date.split("-")[0],
                revenue: hit._source.revenue
            }
        }
    })
}

export const getMovieDetails = async (id) => {
    const response = await client.get({
        index: indexName,
        id: id
    })
    return response._source
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
