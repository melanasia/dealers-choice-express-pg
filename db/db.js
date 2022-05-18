const pg = require('pg');
const client = new pg.Client('postgres://localhost/upcoming_movies');
client.connect();

async function init(client) {
  try {
    const SQL = `
      DROP TABLE IF EXISTS movies;
      CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(25),
        plot VARCHAR(250)
      );
      INSERT INTO movies (title, plot) VALUES ('Jurassic Park', 'In Steven Spielberg's massive blockbuster, paleontologists Alan Grant and Ellie Sattler and mathematician Ian Malcolm are among a select group chosen to tour an island theme park populated by dinosaurs created from prehistoric DNA. While the parks mastermind, billionaire John Hammond, assures everyone that the facility is safe, they find out otherwise when various ferocious predators break free and go on the hunt.');
      INSERT INTO movies (title, plot) VALUES ('Sleepless in Seattle', 'After the death of his wife, Sam Baldwin moves to Seattle with his son, Jonah. When Jonah calls in to a talk-radio program to find a new wife for his father, Sam grudgingly gets on the line to discuss his feelings. Annie Reed, a reporter in Baltimore, hears Sam speak and falls for him, even though she is engaged. Unsure where it will lead, she writes Sam a letter asking him to meet her at the Empire State Building on Valentines Day.');
    `;
    await client.query(SQL);
  }
  catch(ex) {
    console.error(ex);
  }
}

module.exports = {
    client,
    init
};