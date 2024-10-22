import express from 'express'
import cors from 'cors'
import path from 'path'

// Dependencies
import * as data from './data/challenge-data.mjs'
import serviceInnit from './service/challenge-service.mjs'
import apiInnit from './api/challenge-api.mjs'

const services = serviceInnit(data)
const api = apiInnit(services)

const __dirname = path.resolve()

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/client/public/')))

// RQ001
// GET Movies infinite scrolling
app.get('/api/movies', api.getAllMovies)

// RQ002
// GET Movie information
app.get('/api/movies/:id', api.getMovieDetails)

// RQ003
// GET Top 10 Movies by revenue, filtered by year or not
app.get('/api/top', api.getTopMoviesByRevenue)

// Serve SPA
app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/', 'index.html'))
})

app.listen(8080, () => {
    console.log('Server running on port 8080')
})