const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

const db = new sqlite3.Database("mozaik-database.db");

// Enable foreign key constraints.
db.run(`PRAGMA foreign_keys = ON`);

//Create the database tables if they don't exist.
//accounts table
db.run(`
    CREATE TABLE IF NOT EXISTS accounts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
	    username TEXT NOT NULL,
		  password TEXT NOT NULL,
      CONSTRAINT uniqueUsername UNIQUE(username)
	)
`);

//collections table
db.run(`
CREATE TABLE IF NOT EXISTS collections(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  accountId INTEGER,
  FOREIGN KEY(accountId) REFERENCES accounts(id) ON DELETE CASCADE
  )
`);

//images table
db.run(`
CREATE TABLE IF NOT EXISTS images(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL,
  collectionId INTEGER,
  FOREIGN KEY(collectionId) REFERENCES collections(id)  ON DELETE CASCADE
)
`);

const app = express();
app.use(bodyParser.json());

// Enable CORS.
app.use(function (request, response, next) {
  // Allow client-side JS from the following websites to send requests to us:
  // (not optimal, for better security, change * to the URI of your frontend)
  response.setHeader("Access-Control-Allow-Origin", "*");

  // Allow client-side JS to send requests with the following methods:
  response.setHeader("Access-Control-Allow-Methods", "*");

  // Allow client-side JS to send requests with the following headers:
  // (needed for the Authorization and Content-Type headers)
  response.setHeader("Access-Control-Allow-Headers", "*");

  // Allow client-side JS to read the following headers in the response:
  // (in addition to Cache-Control, Content-Language, Content-Type
  // Expires, Last-Modified, Pragma).
  // (needed for the Location header)
  response.setHeader("Access-Control-Expose-Headers", "*");

  next();
});

//createAccount
app.post("/v1/accounts", function (request, response) {
  const account = request.body; //{username: XY, password: XYZ}
  const query = "INSERT INTO accounts (username, password) VALUES (?, ?)";
  const values = [account.username, account.password];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      const id = this.lastID;
      response.setHeader("Location", "/accounts/" + id);
      response.status(201).end();
    }
  });
});

//updateAccountById
app.put("/v1/accounts/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const updatedAccount = request.body; //{username: XY, password: XYZ}
  const query = "UPDATE accounts SET username = ?, password = ? WHERE id = ?";
  const values = [updatedAccount.username, updatedAccount.password, id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(204).end();
    }
  });
});

//deleteAccountById
app.delete("/v1/accounts/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const query = "DELETE FROM accounts WHERE id = ?";
  const values = [id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(204).end();
    }
  });
});

//createCollection
app.post("/v1/collections", function (request, response) {
  const collection = request.body; //{title: XY, description: XYZ, accountId: XY}
  const query = "INSERT INTO collections (title, description, accountId) VALUES (?, ?, ?)";
  const values = [collection.title, collection.description, collection.accountId];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      const id = this.lastID;
      response.setHeader("Location", "/collections/" + id);
      response.status(201).end();
    }
  });
});

//getCollectionsByAccountId
app.get("/v1/collections", function (request, response) {
  const id = request.query.accountId; //collections?accountId=1
  const query = "SELECT * FROM collections WHERE accountId = ?";
  const values = [id];
  db.all(query, values, function (error, collections) {
    if (error) {
      // If something went wrong, send back status code 500.
      response.status(500).end();
    } else {
      // Otherwise, send back the collections in JSON format.
      response.status(200).json(collections);
    }
  });
});

//updateCollectionById
app.put("/v1/collections/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const updatedCollection = request.body; //{title: XY, description: XYZ}
  const query = "UPDATE collections SET title = ?, description = ? WHERE id = ?";
  const values = [updatedCollection.title, updatedCollection.description];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(204).end();
    }
  });
});

//deleteCollectionById
app.delete("/v1/collections/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const query = "DELETE FROM collections WHERE id = ?";
  const values = [id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(204).end();
    }
  });
});

//createImage
app.post("/v1/images", function (request, response) {
  const image = request.body; //{location: XY, collectionId: XY}
  const query = "INSERT INTO images (location, collectionId) VALUES (?, ?)";
  const values = [image.location, image.collectionId];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      const id = this.lastID;
      response.setHeader("Location", "/images/" + id);
      response.status(201).end();
    }
  });
});

//getImagesByCollectionId
app.get("/v1/images", function (request, response) {
  const id = request.query.accountId; //images?collectionId=1
  const query = "SELECT * FROM images WHERE collectionId = ?";
  const values = [id];
  db.all(query, values, function (error, images) {
    if (error) {
      // If something went wrong, send back status code 500.
      response.status(500).end();
    } else {
      // Otherwise, send back the images in JSON format.
      response.status(200).json(images);
    }
  });
});

//deleteImageById
app.delete("/v1/images/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const query = "DELETE FROM images WHERE id = ?";
  const values = [id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(204).end();
    }
  });
});

app.listen(3000, () => {
  console.log("Running...");
});