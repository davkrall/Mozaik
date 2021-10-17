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
      <div class="mt-16 mb-32 flex flex-col justify-center items-center">
        <p class="text-3xl font-display mb-12 text-purple">
          Sign in quick and easy
        </p>
        <form>
          <label for="username" class="font-display text-base pl-4"
            >Username</label
          ><br />
          <input
            id="username"
            type="text"
            placeholder="Example: Katiedesign"
            class="input"
            v-model="signInAccount.signInUsername"
          /><br />
          <label for="password" class="font-display text-base pl-4"
            >Password</label
          ><br />
          <input
            id="password"
            type="password"
            placeholder="Must include 8 characters"
            class="input mb-14"
            v-model="signInAccount.signInPassword"
          /><br />
        </form>

        <div>
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
  props: ["user"],
  data() {
    return {
      signInAccount: {
        signInUsername: "",
        signInPassword: "",
      },
    };
  },
  methods: {
    signUserIn() {
      const username = this.signInAccount.signInUsername;
      const password = this.signInAccount.signInPassword;

      client.signIn(username, password, (errors, account) => {
        if (errors.length == 0) {
          this.user.isSignedIn = true;
          this.user.sessionUserId = account.id;
          this.user.sessionUsername = account.username;
          this.$router.push("/home");
        } else {
          alert(errors);
        }
      });
    },
  },
};
</script>