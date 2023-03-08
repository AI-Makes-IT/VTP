const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'mydatabase',
  multipleStatements: true
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const draftsSql = `
    CREATE TABLE IF NOT EXISTS drafts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL
    );

    INSERT INTO drafts (title, body) VALUES ('Draft 1', 'This is the first draft.');
    INSERT INTO drafts (title, body) VALUES ('Draft 2', 'This is the second draft.');
    INSERT INTO drafts (title, body) VALUES ('Draft 3', 'This is the third draft.');
  `;

  const plansSql = `
    CREATE TABLE IF NOT EXISTS plans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );

    INSERT INTO plans (name, description) VALUES ('Plan 1', 'This is the first plan.');
    INSERT INTO plans (name, description) VALUES ('Plan 2', 'This is the second plan.');
    INSERT INTO plans (name, description) VALUES ('Plan 3', 'This is the third plan.');
  `;

  const documentsSql = `
    CREATE TABLE IF NOT EXISTS documents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      handler VARCHAR(255),
      modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO documents (title, handler, modified) VALUES ('Document 1', 'Setä Manula', '2022-01-31 00:00:00');
    INSERT INTO documents (title, handler, modified) VALUES ('Document 2', 'Jane Doe', '2022-01-29 00:00:00');
    INSERT INTO documents (title, handler, modified) VALUES ('Document 3', 'John Smith', '2022-01-28 00:00:00');
  `;

  connection.query(draftsSql, (error, results) => {
    if (error) {
      console.error('Error initializing drafts table:', error);
    } else {
      console.log('Drafts table initialized');
    }
  });

  connection.query(plansSql, (error, results) => {
    if (error) {
      console.error('Error initializing plans table:', error);
    } else {
      console.log('Plans table initialized');
    }
  });

  connection.query(documentsSql, (error, results) => {
    if (error) {
      console.error('Error initializing documents table:', error);
    } else {
      console.log('Documents table initialized');
    }
  });
}

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};