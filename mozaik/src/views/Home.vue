<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="createAccount(input_createAccount)">createAccount</button>
    <button @click="updateAccountById(4, input_updateAccount)">updateAccount</button>
      <button @click="deleteAccountById(6)">deleteAccount</button>

  </div>
</template>

<script>
const client = require("../mozaik-client");

export default {
  data() {
    return {
      //INPUTS for API calls
      input_createAccount: {
        username: "david89",
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
      client.createAccount(account, (errors, id) => {
        if (errors.length ==0) {
          alert("Account created!" + id);
        } else {
          alert(errors);
        }
      })
    }
  }
};
</script>

<style>
img {
  margin: 50px auto;
  display: block;
}
</style>