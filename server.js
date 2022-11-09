require('dotenv').config()
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

app.use(helmet()); 
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.get('/', (request, response) => {
    response.send('<h1>Cars API</h1>')
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server Started`);
});