<template>
  <div id="app" class="mx-20">
    <main>
      <footer>
        <div
          class="
          container
          flex
          justify-between
          items-center
          border-t border-black
          my-10
        "
        >
          <p class="text-2xl text-normal font-display my-8">Mozaik</p>
          <p class="text-base text-normal font-display my-8">
            Created at Jönköping University, Sweden 2021 Autumn
          </p>
          <p class="text-base text-normal font-display my-8">
            David Krall & Rahel Balogh
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
const client = require("../mozaik-client");

export default {
  props: ["googleData"],
  data() {
    return {};
  },
  created: function() {
    client.googleCredentials(
      this.$route.query.code,
      this.googleData.client_id,
      this.googleData.client_secret,
      this.googleData.redirect_uri,
      (errors, accountToReturn) => {
        if (errors.length == 0) {
          localStorage.setItem("isSignedIn", true);
          localStorage.setItem("sessionUserId", accountToReturn.id);
          localStorage.setItem("sessionUsername", accountToReturn.username);
          this.$router.push("/home");
        } else {
          alert(errors);
        }
      }
    );
  },
};
</script>
