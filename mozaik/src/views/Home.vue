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
};
</script>

<style>
img {
  margin: 50px auto;
  display: block;
}
</style>