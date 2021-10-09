//Much of the code for the SDK has been reused or adapted from the activity-finder-client.js example

const networkDelayInMs = 10;
const rootPath = "http://localhost:3000/v1";

async function sendRequest(
  method,
  uri,
  body = null,
  contentType = "application/json"
) {
  let bodyToSend = "";
  const headers = new Headers();

  // Add the access token if signed in.
  /*
  if (accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  */

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
