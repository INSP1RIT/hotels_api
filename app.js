const express = require('express');


const app = express();
const port = 3000;


// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server side!', app:'Natours'}
// )
// })
//
// app.post('/', (req, res) => {
//     res.end('You can post to this endpoint');
// })


app.get('/api/v1/tours')


app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})