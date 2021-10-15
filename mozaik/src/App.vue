<template>
  <router-view :user="user"/>
</template>

<script>
const client = require("./mozaik-client");

module.exports = {
  data() {
    return {
      user: {
        isSignedIn: false,
        sessionUserId: "",
        sessionUsername: "",
      },
    };
  },
};
</script>
