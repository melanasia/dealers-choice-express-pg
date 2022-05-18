const express = require('express');
const {client, init} = require('./db/db.js');
const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`Method ${req.method} ${req.url}`);
  next();
});

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const query = await client.query('SELECT * FROM movies');
  
  res.send(`
    <html>
      <head>
        <title>Upcoming Movies</title>
        <link rel='stylesheet' href='/style.css' />
      </head>
      <body>
        <h1>Upcoming Movies</h1>
        <ul>
          ${
            query.rows.map(movie => {
                return `<li>
                <a href="/movie/${movie.id}">
                  ${movie.title}
                </a>
                </li>`;
            }).join('')
          }
        </ul>
      </body>
    </html>
  `);
});

app.get('/movie/:id', async (req, res) => {
  const query = await client.query(`SELECT * FROM movies WHERE id = '${req.params.id}'`);
  
  if (query.rowCount !== 1) {
    res.send(`
      <html>
        <head>
          <title>Movie 404</title>
          <link rel='stylesheet' href='/style.css' />
        </head>
        <body>Movie not found, check the URI and try again.</body>
      </html>
    `);
    return;
  }
  
  const currentMovie = query.rows[0];
  
  res.send(`
    <html>
      <head>
        <title>Melanie's Movie DB | ${currentMovie.title}</title>
        <link rel='stylesheet' href='/style.css' />
      </head>
      <body>
        <h1>${currentMovie.title}</h1>
        <a href="/">Back</a>
        <p>${currentMovie.plot}</p>
      </body>
    </html>
  `);
});

const start = async () => {
  await init(client);
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};
start();

