const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/db')

connectDB()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorHandler)

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/exercises', require('./routes/exerciseRoutes'))

app.use('/api/programs', require('./routes/programRoutes'))

app.use('/api/videos', require('./routes/videoRoutes'))

app.use('/api/warmups', require('./routes/warmupRoutes'))

app.use('/api/cooldowns', require('./routes/coolDownRoutes'))

app.use('/api/usergroups', require('./routes/userGroupRoutes'))

app.use('/api/metricsets', require('./routes/metricSetRoutes'))

app.all('/*', (req, res)=> {
    res.status(400).json({
        message: "404 Not Found"
    })
})



app.listen(port, ()=> console.log(`Server is running on Port ${port}`))