<template>
  <router-view :user="user" :googleData="googleData"/>
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
      parameters: {
        collectionList: "",
      },
      googleData: {
        client_id:
          "69457139901-2sl348qsfv7rdc0froackvrs0q12ts5f.apps.googleusercontent.com",
        project_id: "mozaik-330013",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "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",
        redirect_uri: "http://localhost:8080/callback",
      },
    };
  },
};
</script>
