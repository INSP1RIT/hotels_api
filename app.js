const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

app.use(express.json());

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getTour(req, res) {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong id passed',
    });
  }

  res.status(200).json({
    status: 'success',
    tour,
  });
}

function createTour(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
}

function updateTour(req, res) {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong id passed',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<h1>Updated</h1>',
    },
  });
}

function deleteTour(req, res) {
  if (req.params.id > tours.length) {
    return res.status(204).json({
      status: 'fail',
      message: 'Wrong id passed',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}

// //app.get('/api/v1/tours', getAllTours);
//
// app.get('/api/v1/tours/:id', getAllTour);
//
// // app.post('/api/v1/tours', createTour);
//
// app.patch('/api/v1/tours/:id', updateTour);
//
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .g  et(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
