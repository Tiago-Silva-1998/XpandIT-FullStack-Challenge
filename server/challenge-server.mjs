import express from 'express'
import cors from 'cors'
import path from 'path'

const __dirname = path.resolve()

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('client/build'))

/*
    RQ001
    GET Movies infinite scrolling
*/
app.get('/api/movies', async (req, res) => {

})

/*
    RQ002
    GET Movie information
*/
app.get('/api/movies/:id', async (req, res) => {

})

/*
    RQ003
    GET Top 10 Movies by revenue, filtered by year or not
*/
app.get('/api/top', async (req, res) => {

})

/*
    Serve SPA
*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'))
})

app.listen(8080, () => {
    console.log('Server running on port 8080')
})