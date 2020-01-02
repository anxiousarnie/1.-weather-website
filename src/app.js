const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const getWeather= require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'arnaldito'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'arnaldito'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'arnaldito'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide a search term'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
         getWeather(latitude, longitude,(error, getWeatherData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                getWeather: getWeatherData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title:'Error page',
        name:'arnaldito',
        errorText:'page not found try another selection'

    })
   

})
app.get('*',(req, res) => {
    res.render('error',{
        title:'Error page',
        name:'arnaldito', 
        errorText:'my 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.'+ port)
})