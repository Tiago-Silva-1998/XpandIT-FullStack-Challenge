const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')

const client = new Client({ node: 'http://localhost:9200' })
const filePath = 'movie_dataset.json'
const indexName = 'movies'

function readJSONFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
}

async function bulkIndex(indexName, data) {
    const body = data.flatMap((doc) => [{ index: { _index: indexName } }, doc,])

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
