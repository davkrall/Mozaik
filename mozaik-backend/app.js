const express = require("express");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const base64 = require("base-64");
const download = require("image-downloader");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const yaml = require("yaml");

const jwtSecret = "cQfTjWnZr4u7w!z%C*F-JaNdRgUkXp2s";
const idSecret = "8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@";

const client_id = "ShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7";
const client_secret = "8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+";

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
app.use(
  express.raw({
    type: "application/yaml",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const sendResponse = function (request, response, status, resource) {
  if (request.accept == "application/json") {
    response.status(status).json(resource);
  } else if (request.accept == "application/yaml") {
    response.status(status).end(yaml.stringify(resource));
  } else {
    response.status(status).json(resource);
  }
};

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

//Receiving and extracting tokens middleware
app.use(function (request, response, next) {
  try {
    const authorizationHeader = request.get("Authorization");
    if (authorizationHeader.substr(0, 7) === "Bearer ") {
      const accessToken = authorizationHeader.substr("Bearer ".length);

      jwt.verify(accessToken, jwtSecret, function (error, payload) {
        if (error) {
          console.log(`Retrieved invalid access token "${accessToken}".`);
          const message = { error: "invalid_access_token" };
          sendResponse(request, response, 400, message);
        } else {
          request.id = payload.id;
          next();
        }
      });
    } else if (authorizationHeader.substr(0, 6) === "Basic ") {
      const clientAuthorization = authorizationHeader.substr("Basic ".length);

      const clientCredentials = base64.decode(clientAuthorization);
      const indexOfColon = clientCredentials.indexOf(":");

      request.clientId = clientCredentials.substr(0, indexOfColon);
      request.clientSecret = clientCredentials.substr(indexOfColon + 1);
      next();
    } else {
      const message = { error: "invalid_authorization_type" };
      sendResponse(request, response, 400, message);
    }
  } catch (error) {
    next();
  }
});

//Converting the body from YAML if needed, and getting the Accept header
app.use(function (request, response, next) {
  try {
    const contentTypeHeader = request.get("Content-Type");
    const acceptHeader = request.get("Accept");
    if (contentTypeHeader === "application/yaml") {
      request.body = yaml.parse(request.body.toString());
    }
    if (acceptHeader) {
      request.accept = acceptHeader;
    }
    next();
  } catch (error) {
    next();
  }
});

//createAccount
app.post("/v1/accounts", function (request, response) {
  if (request.clientId != client_id || request.clientSecret != client_secret) {
    const message = { error: "invalid_client_credentials" };
    sendResponse(request, response, 400, message);
  } else {
    const account = request.body; //{username: XY, password: XYZ}

    const hashingRounds = 8;
    const passwordToHash = account.password;
    const hashValue = bcrypt.hashSync(passwordToHash, hashingRounds);

    const query = "INSERT INTO accounts (username, password) VALUES (?, ?)";
    const values = [account.username, hashValue];
    db.run(query, values, function (error) {
      if (error) {
        const message = { error: "username_not_unique" };
        sendResponse(request, response, 500, message);
      } else {
        const id = this.lastID;
        response.setHeader("Location", "/accounts/" + id);
        sendResponse(request, response, 201, null);
      }
    });
  }
});

//updateAccountById
app.put("/v1/accounts/:id", function (request, response) {
  const id = parseInt(request.params.id);
  if (id != request.id) {
    const message = { error: "unauthorized_request" };
    sendResponse(request, response, 400, message);
  } else {
    const updatedAccount = request.body; //{username: XY, password: XYZ}

    const hashingRounds = 8;
    const passwordToHash = updatedAccount.password;
    const hashValue = bcrypt.hashSync(passwordToHash, hashingRounds);

    const query = "UPDATE accounts SET username = ?, password = ? WHERE id = ?";
    const values = [updatedAccount.username, hashValue, id];
    db.run(query, values, function (error) {
      if (error) {
        const message = { error: "username_not_unique" };
        sendResponse(request, response, 500, message);
      } else {
        sendResponse(request, response, 204, null);
      }
    });
  }
});

//deleteAccountById
app.delete("/v1/accounts/:id", function (request, response) {
  const id = parseInt(request.params.id);
  if (id != request.id) {
    const message = { error: "unauthorized_request" };
    sendResponse(request, response, 400, message);
  } else {
    const query = "DELETE FROM accounts WHERE id = ?";
    const values = [id];
    db.run(query, values, function (error) {
      if (error) {
        const message = { error: "account_not_exists" };
        sendResponse(request, response, 500, message);
      } else {
        sendResponse(request, response, 204, null);
      }
    });
  }
});

//createCollection
app.post("/v1/collections", function (request, response) {
  const collection = request.body; //{title: XY, description: XYZ, accountId: XY}
  if (collection.accountId != request.id) {
    const message = { error: "unauthorized_request" };
    sendResponse(request, response, 400, message);
  } else {
    const query =
      "INSERT INTO collections (title, description, accountId) VALUES (?, ?, ?)";
    const values = [
      collection.title,
      collection.description,
      collection.accountId,
    ];
    db.run(query, values, function (error) {
      if (error) {
        sendResponse(request, response, 500, null);
      } else {
        const id = this.lastID;
        response.setHeader("Location", "/collections/" + id);
        sendResponse(request, response, 201, null);
        fs.mkdirSync("../mozaik/public/images/" + id);
      }
    });
  }
});

//getCollectionsByAccountId
app.get("/v1/collections", function (request, response) {
  const id = request.query.accountId; //collections?accountId=1
  if (id != request.id) {
    const message = { error: "unauthorized_request" };
    sendResponse(request, response, 400, message);
  } else {
    const query = "SELECT * FROM collections WHERE accountId = ?";
    const values = [id];
    db.all(query, values, function (error, collections) {
      if (error) {
        // If something went wrong, send back status code 500.
        sendResponse(request, response, 500, null);
      } else {
        // Otherwise, send back the collections in JSON format.
        sendResponse(request, response, 200, collections);
      }
    });
  }
});

//updateCollectionById
app.put("/v1/collections/:id", function (request, response) {
  const id = parseInt(request.params.id);
  let query = "SELECT * FROM collections WHERE id = ?";
  let values = [id];
  db.get(query, values, function (error, collection) {
    if (error) {
      const message = { error: "collection_not_exists" };
      sendResponse(request, response, 500, message);
    } else if (collection.accountId != request.id) {
      const message = { error: "unauthorized_request" };
      sendResponse(request, response, 400, message);
    } else {
      const updatedCollection = request.body; //{title: XY, description: XYZ}
      query = "UPDATE collections SET title = ?, description = ? WHERE id = ?";
      values = [updatedCollection.title, updatedCollection.description, id];
      db.run(query, values, function (error) {
        if (error) {
          sendResponse(request, response, 500, null);
        } else {
          sendResponse(request, response, 204, null);
        }
      });
    }
  });
});

//deleteCollectionById
app.delete("/v1/collections/:id", function (request, response) {
  const id = parseInt(request.params.id);
  let query = "SELECT * FROM collections WHERE id = ?";
  let values = [id];
  db.get(query, values, function (error, collection) {
    if (error) {
      const message = { error: "collection_not_exists" };
      sendResponse(request, response, 500, message);
    } else if (collection.accountId != request.id) {
      const message = { error: "unauthorized_request" };
      sendResponse(request, response, 400, message);
    } else {
      query = "DELETE FROM collections WHERE id = ?";
      values = [id];
      db.run(query, values, function (error) {
        if (error) {
          sendResponse(request, response, 500, null);
        } else {
          sendResponse(request, response, 204, null);
          fs.rmdirSync("../mozaik/public/images/" + id);
        }
      });
    }
  });
});

//createImage
app.post("/v1/images", function (request, response) {
  const image = request.body; //{url: XY, collectionId: XY}
  let query = "SELECT * FROM collections WHERE id = ?";
  let values = [image.collectionId];
  db.get(query, values, function (error, collection) {
    if (error) {
      const message = { error: "collection_not_exists" };
      sendResponse(request, response, 500, message);
    } else if (collection.accountId != request.id) {
      const message = { error: "unauthorized_request" };
      sendResponse(request, response, 400, message);
    } else {
      const fileName = image.url.substr(image.url.lastIndexOf("/") + 1);

      const options = {
        url: image.url,
        dest:
          "../mozaik/public/images/" +
          image.collectionId +
          "/" +
          Date.now() +
          "_" +
          fileName,
      };

      const location = options.dest;

      query = "INSERT INTO images (location, collectionId) VALUES (?, ?)";
      values = [location.substr(24), image.collectionId];
      db.run(query, values, function (error) {
        if (error) {
          sendResponse(request, response, 500, null);
        } else {
          download
            .image(options)
            .then(({ filename }) => {
              console.log("Saved to", filename);
            })
            .catch((err) => console.error(err));
          const id = this.lastID;
          response.setHeader("Location", "/images/" + id);
          sendResponse(request, response, 201, message);
        }
      });
    }
  });
});

//getImagesByCollectionId
app.get("/v1/images", function (request, response) {
  const id = request.query.collectionId; //images?collectionId=1
  let query = "SELECT * FROM collections WHERE id = ?";
  let values = [id];
  db.get(query, values, function (error, collection) {
    if (error) {
      const message = { error: "collection_not_exists" };
      sendResponse(request, response, 500, message);
    } else if (collection.accountId != request.id) {
      const message = { error: "unauthorized_request" };
      sendResponse(request, response, 400, message);
    } else {
      query = "SELECT * FROM images WHERE collectionId = ?";
      values = [id];
      db.all(query, values, function (error, images) {
        if (error) {
          // If something went wrong, send back status code 500.
          sendResponse(request, response, 500, null);
        } else {
          // Otherwise, send back the images.
          sendResponse(request, response, 200, images);
        }
      });
    }
  });
});

//deleteImageById
app.delete("/v1/images/:id", function (request, response) {
  const id = parseInt(request.params.id);
  let query = "SELECT * FROM images WHERE id = ?";
  let values = [id];
  db.get(query, values, function (error, image) {
    if (error) {
      const message = { error: "image_not_exists" };
      sendResponse(request, response, 500, message);
    } else {
      query = "SELECT * FROM collections WHERE id = ?";
      values = [image.collectionId];
      db.get(query, values, function (error, collection) {
        if (error) {
          const message = { error: "collection_not_exists" };
          sendResponse(request, response, 500, message);
        } else if (collection.accountId != request.id) {
          const message = { error: "unauthorized_request" };
          sendResponse(request, response, 400, message);
        } else {
          query = "DELETE FROM images WHERE id = ?";
          values = [id];
          db.run(query, values, function (error) {
            if (error) {
              sendResponse(request, response, 500, null);
            } else {
              sendResponse(request, response, 204, null);
              fs.unlinkSync("../mozaik/public/images/" + image.location);
            }
          });
        }
      });
    }
  });
});

//signIn
app.post("/v1/tokens", function (request, response) {
  if (request.clientId != client_id || request.clientSecret != client_secret) {
    const message = { error: "invalid_client_credentials" };
    sendResponse(request, response, 400, message);
  } else {
    const requestGrantType = request.body.grant_type;
    const requestUsername = request.body.username;
    const requestPassword = request.body.password;

    const query = "SELECT * FROM accounts WHERE username = ?";
    const values = [requestUsername];

    if (requestGrantType != "password") {
      const message = { error: "unsupported_grant_type" };
      sendResponse(request, response, 400, message);
    } else if (requestUsername == null || requestPassword == null) {
      const message = { error: "invalid_request" };
      sendResponse(request, response, 400, message);
    } else {
      db.get(query, values, function (error, account) {
        if (error || account == null) {
          const message = { error: "invalid_grant" };
          sendResponse(request, response, 400, message);
        } else if (bcrypt.compareSync(requestPassword, account.password)) {
          const dataToPutInAccessToken = {
            id: account.id,
          };
          const accessToken = jwt.sign(dataToPutInAccessToken, jwtSecret);
          const dateNow = Math.floor(Date.now() / 1000);
          const dataToPutInIdToken = {
            iss: "http://localhost:3000/",
            sub: account.id,
            aud: "7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+",
            exp: dateNow + 86400,
            iat: dateNow,
            preferred_username: account.username,
          };
          const idToken = jwt.sign(dataToPutInIdToken, idSecret);
          sendResponse(request, response, 200, {
            access_token: accessToken,
            token_type: "Bearer",
            id_token: idToken,
          });
        } else {
          const message = { error: "invalid_grant" };
          sendResponse(request, response, 400, message);
        }
      });
    }
  }
});

//getAccount
app.get("/v1/accounts", function (request, response) {
  if (request.clientId != client_id || request.clientSecret != client_secret) {
    const message = { error: "invalid_client_credentials" };
    sendResponse(request, response, 400, message);
  } else {
    const username = request.query.username; //accounts?username=abc123
    const query = "SELECT EXISTS(SELECT 1 FROM accounts WHERE username = ?)";
    const values = [username];
    db.all(query, values, function (error, result) {
      if (error) {
        // If something went wrong, send back status code 500.
        sendResponse(request, response, 500, null);
      } else {
        // Otherwise, send back the result (0 or 1)
        sendResponse(request, response, 200, Object.values(result[0])[0]);
      }
    });
  }
  
});

app.listen(3000, () => {
  console.log("Running...");
});
