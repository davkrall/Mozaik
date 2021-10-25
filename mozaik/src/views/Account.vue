<template>
  <div id="app" class="mx-20">
    <div class="items-center border-b border-black">
      <header class="container flex justify-between items-center mt-10 mb-5">
        <router-link to="/">
          <h1 class="text-4xl text-normal font-display">Mozaik</h1></router-link
        >
      </header>
    </div>

    <main>
      <div class="h-90">
        <div class="mt-36 mb-36 flex flex-col justify-center items-center">
          <div class="flex items-center">
            <svg
              @click="$router.go(-1)"
              class="absolute left-20 cursor-pointer"
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.29795 7.33096L20.231 7.33095L20.231 9.35937L3.29795 9.35937L3.29795 7.33096Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.10066 7.44422C6.2102 8.12115 9.43114 11.3421 10.1081 15.4516L8.10662 15.7813C7.57103 12.5297 5.02254 9.98126 1.77098 9.44566L2.10066 7.44422Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.77061 7.17289C5.0221 6.63721 7.57071 4.08868 8.10628 0.837251L10.1077 1.16692C9.43082 5.27639 6.20971 8.4973 2.10034 9.17432L1.77061 7.17289Z"
                fill="black"
              />
            </svg>

            <p class="text-3xl font-display text-purple">Manage your account</p>
          </div>

          <p class="text-lg font-normal font-body text-black mt-10 mb-14">
            You are signed in as {{ username }}
          </p>

          <div>
            <button @click="deleteAccount()" class="btn-outline justify-end">
              Delete account
            </button>

            <button @click="updateAccount()" class="btn-purple">
              Update account
            </button>
          </div>
        </div>
      </div>
    </main>

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
  </div>
</template>

<script>
const client = require("../mozaik-client");

export default {
  methods: {
    deleteAccount() {
      if (confirm("Are you sure you want to delete this account?")) {
        client.deleteAccountById(
          localStorage.getItem("sessionUserId"),
          (errors) => {
            if (errors.length == 0) {
              client.signOut();
              localStorage.setItem("isSignedIn", false);
              localStorage.removeItem("sessionUserId");
              localStorage.removeItem("sessionUsername");
              localStorage.removeItem("collectionList");
              this.$router.push("/");
            } else {
              alert(errors);
            }
          }
        );
      }
    },
    
    updateAccount() {
      var accountId = localStorage.getItem("sessionUserId");
      var updatedUsername = "";
      updatedUsername = prompt("Update your username below!", "");

      var updatedPassword = "";
      updatedPassword = prompt("Update your password below!", "");

      const updatedUser = {
        username: updatedUsername,
        password: updatedPassword,
      };

      const invalidValues = ["", null];

      if (
        invalidValues.indexOf(updatedUsername) != -1 ||
        invalidValues.indexOf(updatedPassword) != -1
      ) {
        alert("Fill in both data!");
      } else {
        client.updateAccountById(accountId, updatedUser, (errors, account) => {
          if (errors.length == 0) {
            alert("Account updated!");
            localStorage.setItem("sessionUsername", updatedUser.username);
          } else {
            alert(errors);
          }
        });
      }
    },

    getFromLocalStorage() {
      this.username = localStorage.getItem("sessionUsername");
    }
  },

  created() {
    this.getFromLocalStorage();
  },
};
</script>
