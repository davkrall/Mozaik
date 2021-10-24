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

        <svg
          class="mt-7 mb-4"
          width="60"
          height="60"
          viewBox="0 0 46 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_11:833)">
            <path
              d="M22.9999 0.11792C10.5672 0.11792 0.450684 10.0069 0.450684 22.1647C0.450684 34.3224 10.5672 44.2114 22.9999 44.2114C35.4326 44.2114 45.5491 34.3224 45.5491 22.1647C45.5491 10.0069 35.4326 0.11792 22.9999 0.11792ZM22.9999 42.7429C11.3955 42.7429 1.95537 33.5112 1.95537 22.1647C1.95537 10.8182 11.3955 1.58642 22.9999 1.58642C34.6043 1.58642 44.0444 10.8182 44.0444 22.1647C44.0444 33.5112 34.6043 42.7429 22.9999 42.7429Z"
              fill="black"
            />
            <path
              d="M27.9218 9.78961H24.1699C19.3915 9.74286 18.7811 12.6345 18.7811 15.764V18.0396H16.6718C16.5764 18.0272 16.4794 18.0364 16.3883 18.0665C16.2972 18.0967 16.2144 18.1469 16.1464 18.2134C16.0784 18.2799 16.027 18.3609 15.9962 18.45C15.9653 18.539 15.9559 18.6339 15.9686 18.7271V22.8521C15.9559 22.9453 15.9653 23.0402 15.9962 23.1292C16.027 23.2183 16.0784 23.2993 16.1464 23.3658C16.2144 23.4323 16.2972 23.4826 16.3883 23.5127C16.4794 23.5429 16.5764 23.5521 16.6718 23.5396H18.7811V33.8521C18.7694 33.9455 18.7797 34.0403 18.8112 34.1292C18.8426 34.2181 18.8945 34.2988 18.9627 34.3651C19.031 34.4315 19.1138 34.4817 19.2049 34.5119C19.2961 34.5421 19.393 34.5516 19.4885 34.5396H23.7846C24.1994 34.5864 24.5355 34.2577 24.4033 33.8521L24.4061 23.5396H27.9218C28.0171 23.5521 28.1141 23.5429 28.2052 23.5127C28.2963 23.4826 28.3791 23.4323 28.4471 23.3658C28.5151 23.2993 28.5665 23.2183 28.5974 23.1292C28.6282 23.0402 28.6376 22.9453 28.6249 22.8521V18.7271C28.6376 18.6339 28.6282 18.539 28.5974 18.45C28.5665 18.3609 28.5151 18.2799 28.4471 18.2134C28.3791 18.1469 28.2963 18.0967 28.2052 18.0665C28.1141 18.0364 28.0171 18.0272 27.9218 18.0396H24.4019L24.4061 15.9771C24.5425 15.0985 24.5426 15.2415 25.3765 15.2896H27.8922C28.0877 15.247 28.2958 15.2704 28.4421 15.1315C28.5883 14.9926 28.6727 14.8029 28.6235 14.6021V10.4771C28.6365 10.384 28.6273 10.2891 28.5966 10.2C28.566 10.1109 28.5147 10.03 28.4468 9.96342C28.3789 9.89688 28.2961 9.84658 28.2051 9.81643C28.114 9.78628 28.0171 9.7771 27.9218 9.78961ZM27.1694 13.8376L25.406 13.7716C23.2221 13.7716 23.0393 14.9307 23.0393 16.1174L23.0336 18.7244C23.0335 18.8209 23.0527 18.9165 23.0904 19.0058C23.1281 19.095 23.1833 19.1761 23.2531 19.2444C23.3228 19.3128 23.4057 19.367 23.4969 19.404C23.5881 19.4409 23.6858 19.46 23.7846 19.46H27.2186V22.1165H23.7874C23.5881 22.1165 23.397 22.1938 23.2559 22.3315C23.1149 22.4691 23.0354 22.6559 23.035 22.8507L23.0336 33.1646H20.1874V22.8521C20.1874 22.4465 19.9047 22.1179 19.4885 22.1179H17.3749V19.4614H19.4885C19.5872 19.4615 19.6849 19.4426 19.7761 19.4058C19.8673 19.369 19.9502 19.315 20.02 19.2469C20.1607 19.108 20.186 18.921 20.186 18.7257V15.7626C20.186 12.6799 20.823 11.2114 24.1685 11.2114H27.168V13.8376H27.1694Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_11:833">
              <rect
                width="45"
                height="44"
                fill="white"
                transform="translate(0.5 0.164551)"
              />
            </clipPath>
          </defs>
        </svg>

        <p class="mt-3 mb-6">Or create an account below:</p>

        <form>
          <label for="username" class="font-display text-base pl-4"
            >Username</label
          ><br />
          <input
            id="username"
            type="text"
            placeholder="Example: Katie"
            class="input"
            v-model="signUpAccount.signUpUsername"
          /><br />
          <label for="password" class="font-display text-base pl-4"
            >Password</label
          ><br />
          <input
            id="password"
            type="password"
            placeholder="Use at least 6 characters"
            class="input"
            v-model="signUpAccount.signUpPassword"
          /><br />
        </form>



        <a :href="googleAuthLink">Register with Google</a>



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
  props: ["user", "googleData"],
  data() {
    return {
      signUpAccount: {
        signUpUsername: "",
        signUpPassword: "",
      },
    };
  },
  computed: {
    googleAuthLink() {
      return this.googleData.auth_uri + "?client_id=" + this.googleData.client_id + "&redirect_uri=" + this.googleData.redirect_uri + "&response_type=code&scope=profile"
  }},
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
            this.$router.push("/signin");
          } else {
            alert(errors);
          }
        });
      }
    },
  },
};
</script>
