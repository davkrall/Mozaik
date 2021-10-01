<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="createAccount(input_createAccount)">createAccount</button>
    <button @click="updateAccountById(4, input_updateAccount)">updateAccount</button>
      <button @click="deleteAccountById(6)">deleteAccount</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //INPUTS for API calls
      input_createAccount: {
        username: "david91",
        password: "thisismypassword"
      },
      input_updateAccount: {
        username: "david100",
        password: "thisismypassword2"
      },
    };
  },
  methods: {
    createAccount(account) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("POST", "http://localhost:3000/v1/accounts");

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        const locationHeader = request.getResponseHeader("Location");
        console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(account);
      request.send(bodyAsString);
    },
    updateAccountById(id, account) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("PUT", "http://localhost:3000/v1/accounts/" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(account);
      request.send(bodyAsString);
    },
    deleteAccountById(id) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("DELETE", "http://localhost:3000/v1/accounts/" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      request.send();
    },
    createCollection(collection) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("POST", "http://localhost:3000/v1/collections");

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        const locationHeader = request.getResponseHeader("Location");
        console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(collection);
      request.send(bodyAsString);
    },
    getCollectionByAccountId(id) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("GET", "http://localhost:3000/v1/collections/?accountId=" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(id);
      request.send(bodyAsString);
    },
    updateCollectionById(id, collection) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("PUT", "http://localhost:3000/v1/collection/" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(collection);
      request.send(bodyAsString);
    },
    deleteCollectionById(id) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("DELETE", "http://localhost:3000/v1/collections/" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      request.send();
    },
    createCollection(image) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("POST", "http://localhost:3000/v1/images");

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        const locationHeader = request.getResponseHeader("Location");
        console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(image);
      request.send(bodyAsString);
    },
    getImagesByCollectionId(id) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("GET", "http://localhost:3000/v1/images/?collectionId=" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      const bodyAsString = JSON.stringify(id);
      request.send(bodyAsString);
    },
    deleteImagesById(id) {
      const request = new XMLHttpRequest();

      // Specify method and URI.
      request.open("DELETE", "http://localhost:3000/v1/images/" + id);

      // Add headers to the request.
      request.setRequestHeader("Content-Type", "application/json");
      // ...

      // Add a callback function that will be called when
      // we receive back the response.
      request.addEventListener("load", function() {
        const statusCode = request.status;
        //const bodyAsString = request.responseText;
        //const bodyAsJsObject = JSON.parse(bodyAsString);
        //const locationHeader = request.getResponseHeader("Location");
        //console.log(locationHeader);
      });

      // Add a callback function that will be called if
      // the communication with the server fails.
      request.addEventListener("error", function() {
        // Request failed :(
      });

      // Specify body and send it.
      request.send();
    },
  },
};
</script>

<style>
img {
  margin: 50px auto;
  display: block;
}
</style>