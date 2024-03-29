const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/db');
const path = require('path')
connectDB()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorHandler)

app.use("/", express.static(path.resolve(path.join(__dirname, '../'), 'frontend', 'build')));
app.use("/", express.static(path.resolve(__dirname, 'uploads')))


app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/workouts', require('./routes/workoutRoutes'))

app.use('/api/programs', require('./routes/programRoutes'))

app.use('/api/videos', require('./routes/videoRoutes'))

app.use('/api/usergroups', require('./routes/userGroupRoutes'))

app.use('/api/metricsets', require('./routes/metricSetRoutes'))

app.use('/api/nutritionplans', require('./routes/nutritionPlanRoutes'))

app.get('/*', (req,res)=> {
    res.sendFile(path.resolve(path.join(__dirname, '../'), 'frontend', 'build', 'index.html' ))
})

app.all('/*', (req, res)=> {
    res.status(400).json({
        message: "404 Not Found"
    })
})



app.listen(port, ()=> console.log(`Server is running on Port ${port}`))