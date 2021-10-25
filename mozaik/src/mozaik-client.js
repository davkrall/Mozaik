//Much of the code for the SDK has been reused or adapted from the activity-finder-client.js example
const jwtDecode = require("jwt-decode").default;
const base64 = require("base-64");

const networkDelayInMs = 10;
const rootPath = "http://localhost:3000/v1";
const client_id = "ShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7";
const client_secret = "8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+";
const google_login_secret = "aNnm/bQTCC/<6E[&qU2XukmQ5vMx24%p";

async function sendRequest(
  method,
  uri,
  body = null,
  contentType = "application/json"
) {
  let bodyToSend = "";
  const headers = new Headers();
  let accessToken = localStorage.getItem("accessToken");
  // Add the access token if signed in, and the client authentication token if not
  if (accessToken != "" && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  } else {
    headers.append(
      "Authorization",
      "Basic " + base64.encode(client_id + ":" + client_secret)
    );
  }

  // Add the body if available.
  if (body != null) {
    headers.append("Content-Type", contentType);

    switch (contentType) {
      case "application/json":
        bodyToSend = JSON.stringify(body);
        break;

      case "application/x-www-form-urlencoded":
        const data = new URLSearchParams();
        for (const key of Object.keys(body)) {
          data.append(key, body[key]);
        }
        bodyToSend = data.toString();
        break;

      default:
        alert("ERROR, unknown Content-Type to send body with.");
    }
  }

  try {
    const requestInit = {
      method,
      headers,
    };

    if (bodyToSend != "") {
      requestInit.body = bodyToSend;
    }
    await sleep(networkDelayInMs);
    return await fetch(rootPath + uri, requestInit);
  } catch (error) {
    throw ["networkError"];
  }
}

function displayError(response) {
  alert(`
		SDK has not been programmed to handle status code ${response.status}
		for the last request sent.
	`);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createAccount(account, callback) {
  //account: {username: XY, password: XYZ}
  let response;

  try {
    response = await sendRequest("POST", "/accounts", account);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/accounts/".length));
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors, id);
}

export async function updateAccountById(id, account, callback) {
  //id: the account's id number
  //account: {username: XY, password: XYZ}
  let response;

  try {
    response = await sendRequest("PUT", "/accounts/" + id, account);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors);
}

export async function deleteAccountById(id, callback) {
  //id: the account's id number
  let response;

  try {
    response = await sendRequest("DELETE", "/accounts/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors);
}

export async function createCollection(collection, callback) {
  //collection: {title: XY, description: XYZ, accountId: the active account's id}
  let response;

  try {
    response = await sendRequest("POST", "/collections", collection);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/collections/".length));
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors, id);
}

export async function getCollectionsByAccountId(id, callback) {
  //id: the account's id number
  let response;

  try {
    response = await sendRequest("GET", "/collections/?accountId=" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let collections = [];

  switch (response.status) {
    case 200:
      collections = await response.json();
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors, collections);
}

export async function updateCollectionById(id, collection, callback) {
  //id: the account's id number
  //collection: {title: XY, description: XYZ}

  let response;

  try {
    response = await sendRequest("PUT", "/collections/" + id, collection);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors);
}

export async function deleteCollectionById(id, callback) {
  //id: the collection's id number
  let response;

  try {
    response = await sendRequest("DELETE", "/collections/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors);
}

export async function createImage(image, callback) {
  //{url: XY, collectionId: XY}
  let response;

  try {
    response = await sendRequest("POST", "/images", image);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/images/".length));
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors, id);
}

export async function getImagesByCollectionId(id, callback) {
  //id: the collection's id number
  let response;

  try {
    response = await sendRequest("GET", "/images/?collectionId=" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let images = [];

  switch (response.status) {
    case 200:
      images = await response.json();
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors, images);
}

export async function deleteImageById(id, callback) {
  //id: the image's id number
  let response;

  try {
    response = await sendRequest("DELETE", "/images/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }

  callback(errors);
}

export async function signIn(username, password, callback) {
  const bodyToSend = {
    grant_type: "password",
    username,
    password,
  };

  let response;

  try {
    response = await sendRequest(
      "POST",
      "/tokens",
      bodyToSend,
      "application/x-www-form-urlencoded"
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let account = {
    id: -1,
    username: "",
  };
  let body;

  switch (response.status) {
    case 200:
      body = await response.json();
      localStorage.setItem("accessToken", body.access_token);

      const payload = jwtDecode(body.id_token);
      account.id = payload.sub;
      account.username = payload.preferred_username;
      break;

    case 400:
      errors = ["Incorrect credentials!"];
      break;

    default:
      displayError(response);
  }

  callback(errors, account);
}

export async function signOut() {
  localStorage.removeItem("accessToken");
}

async function googleAuth(code, client_id, client_secret, redirect_uri) {
  let bodyToSend;
  let body = {
    code: code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const data = new URLSearchParams();
  for (const key of Object.keys(body)) {
    data.append(key, body[key]);
  }
  bodyToSend = data.toString();

  try {
    const requestInit = {
      method: "POST",
      headers,
      body: bodyToSend,
    };

    return await fetch("https://oauth2.googleapis.com/token", requestInit);
  } catch (error) {
    throw ["networkError"];
  }
}

async function getAccount(username) {
  let response;

  try {
    response = await sendRequest("GET", "/accounts?username=" + username);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let result = -1;

  switch (response.status) {
    case 200:
      result = await response.json();
      return result;

    case 500:
      errors = ["backendError"];
      break;

    default:
      displayError(response);
  }
}

export async function googleCredentials(
  code,
  client_id,
  client_secret,
  redirect_uri,
  callback
) {
  let response;

  try {
    response = await googleAuth(code, client_id, client_secret, redirect_uri);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let accountToReturn;

  switch (response.status) {
    case 200:
      const body = await response.json();
      const payload = jwtDecode(body.id_token);
      const googleUsername = payload.name;
      const googlePassword =
        googleUsername + "_" + payload.sub + "_" + google_login_secret;

      const registeredUser = await getAccount(googleUsername);
      if (registeredUser) {
        //sign in
        await signIn(googleUsername, googlePassword, (errors, account) => {
          if (errors.length == 0) {
            accountToReturn = account;
          } else {
            alert(errors);
          }
        });
      } else {
        //register
        const newAccount = {
          username: googleUsername,
          password: googlePassword,
        };
        await createAccount(newAccount, (errors, id) => {});

        //and sign in
        await signIn(googleUsername, googlePassword, (errors, account) => {
          if (errors.length == 0) {
            accountToReturn = account;
          } else {
            alert(errors);
          }
        });
      }
      break;

    default:
      displayError(response);
  }

  callback(errors, accountToReturn);
}
