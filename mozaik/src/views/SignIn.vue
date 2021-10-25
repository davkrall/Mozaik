<template>
  <div id="app" class="mx-20">
    <div class="items-center border-b border-black">
      <header class="container flex justify-between items-center mt-10 mb-5">
        <router-link to="/">
          <h1 class="text-4xl text-normal font-display">Mozaik</h1></router-link
        >
        <nav class="flex">
          <router-link :to="'/signin/'"
            ><button class="btn-outline justify-end invisible">
              Sign in
            </button></router-link
          >
          <router-link :to="'/registration/'"
            ><button class="btn-purple invisible">Register</button></router-link
          >
        </nav>
      </header>
    </div>

    <main>
      <div class="mt-20 mb-20 flex flex-col justify-center items-center">
        <p class="text-3xl font-display text-purple">
          Sign in quick and easy
        </p>

        <p class="text-base font-normal font-body text-black mt-6">
          Use Google to sign into your account
        </p>

        <button class="btn-purple w-64 my-8">
          <a :href="googleAuthLink">Sign in with Google</a>
        </button>

        <p class="mb-6">Or fill in the fields below:</p>

        <form>
          <label for="username" class="font-display text-base pl-4"
            >Username</label
          ><br />
          <input
            id="username"
            type="text"
            placeholder="Example: Katie"
            class="input"
            v-model="signInAccount.signInUsername"
          /><br />
          <label for="password" class=" font-display text-base pl-4"
            >Password</label
          ><br />
          <input
            id="password"
            type="password"
            placeholder="Use at least 6 characters"
            class="input mb-10"
            v-model="signInAccount.signInPassword"
          /><br />
        </form>
        <div>
          <router-link :to="'/registration'"
            ><button class="btn-outline">Register</button></router-link
          >
          <button class="btn-purple" @click="signUserIn">Sign in</button>
        </div>
      </div>

      <footer>
        <div
          class="
          container
          flex
          justify-between
          items-center
          border-t border-black
          mb-10
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
    return {
      signInAccount: {
        signInUsername: "",
        signInPassword: "",
      },
    };
  },
  computed: {
    googleAuthLink() {
      return (
        this.googleData.auth_uri +
        "?client_id=" +
        this.googleData.client_id +
        "&redirect_uri=" +
        this.googleData.redirect_uri +
        "&response_type=code&scope=profile"
      );
    },
  },
  methods: {
    signUserIn() {
      const username = this.signInAccount.signInUsername;
      const password = this.signInAccount.signInPassword;

      if (username == "" || password == "") {
        alert("Fill in all required fields!");
      } else {
        client.signIn(username, password, (errors, account) => {
          if (errors.length == 0) {
            localStorage.setItem("isSignedIn", true);
            localStorage.setItem("sessionUserId", account.id);
            localStorage.setItem("sessionUsername", account.username);
            this.$router.push("/home");
          } else {
            alert(errors);
          }
        });
      }
    },
  },
};
</script>
