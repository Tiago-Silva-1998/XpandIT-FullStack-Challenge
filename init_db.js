const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')

const client = new Client({ node: process.env.ELASTICSEARCH_URL })
const filePath = 'movie_dataset.json'
const indexName = 'movies'

function readJSONFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

async function bulkIndex(indexName, data) {

    let online = false
    while (!online) {
        try {
            await client.cluster.health({wait_for_status: 'yellow'})
            online = true
        } catch (ConnectionError) {
            await sleep(1000)
        }
    }

    const index = await client.indices.exists({ index: indexName })
    if (index) return

    const body = data.filter((doc) => doc.revenue > 0).flatMap((doc) => [{ index: { _index: indexName } }, doc])

    const bulkResponse = await client.bulk({ refresh: true, body })

    if (bulkResponse.errors) {
        console.log('Errors occurred during bulk indexing');
        bulkResponse.items.forEach((item, i) => {
            if (item.index && item.index.error) {
                console.error(`Error in document ${i}:`, item.index.error)
            }
        });
    } else {
        console.log('Bulk indexing successful')
    }
}

async function loadData() {
    try {
        const data = readJSONFile(filePath)
        await bulkIndex(indexName, data)
        console.log('Data imported successfully!')
    } catch (error) {
        console.error('Error importing data:', error)
    }
}

loadData()
