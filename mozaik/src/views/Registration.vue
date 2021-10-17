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
        <p class="text-3xl font-display text-purple">Register quick and easy</p>
        <p class="text-base font-normal font-body text-black mt-6">
          Register an acccount with Facebook
        </p>

        <img
          src="../assets/facebook-icon-3.png"
          alt="facebook icon"
          class="w-14 h-14 mt-7 mb-4"
        />
        <p class="my-3">or</p>

        <form>
          <label for="username" class="font-display text-base pl-4"
            >Username</label
          ><br />
          <input
            id="username"
            type="text"
            placeholder="Example: Katiedesign"
            class="input"
            v-model="signUpAccount.signUpUsername"
          /><br />
          <label for="password" class="font-display text-base pl-4"
            >Password</label
          ><br />
          <input
            id="password"
            type="password"
            placeholder="Must include 8 characters"
            class="input"
            v-model="signUpAccount.signUpPassword"
          /><br />
        </form>

        <!--<p class="mb-3 mr-med">Profile picture</p>

         <button class="btn-outline-icon inline-flex items-center mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="12 -2 30 30"
            fill="none"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="overflow-visible stroke-current"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>

           <span>Upload profile picture</span>
        </button>-->

        <div class="mt-6">
          <router-link :to="'/signin'"
            ><button class="btn-outline">Sign in</button></router-link
          >

          <button class="btn-purple" @click="createUser">Register</button>
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
  data() {
    return {
      signUpAccount: {
        signUpUsername: "",
        signUpPassword: "",
      },
    };
  },
  methods: {
    createUser() {
      const account = {
        username: this.signUpAccount.signUpUsername,
        password: this.signUpAccount.signUpPassword,
      };

      if (account.username == "" || account.password == "") {
        alert("Fill in all the input fields!");
      } else {
        client.createAccount(account, (errors, id) => {
          if (errors.length == 0) {
            this.signUpAccount.signUpUsername = "";
            this.signUpAccount.signUpPassword = "";
            //alert("Account created!");
            this.$router.push("/signin2");
          } else {
            alert(errors);
          }
        });
      }
    },
  },
};
</script>
