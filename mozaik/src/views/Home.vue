<template>
  <div id="app" class="mx-20">
    <header class="container flex justify-between items-center my-10">
      <router-link to="/home">
        <h1 class="text-4xl text-normal font-display">Mozaik</h1></router-link
      >
      <nav class="flex">
        <router-link :to="'/'"
          ><button @click="signOut()" class="btn-purple">
            Sign out
          </button></router-link
        >
      </nav>
    </header>

    <main>
      <div class="flex mt-20 mb-8">
        <img
          src="../assets/test-profile-pic.png"
          alt="profile-pic"
          class="w-28 h-28"
        />
        <div>
          <p class="font-display text-lg">{{ this.user.sessionUsername }}</p>
        </div>
      </div>

      <div class="container flex justify-between items-center">
        <div>
          <router-link
            to="/home"
            class="font-display relative mr-9 active:text-black"
            >My collections<span class="text-sm absolute -right-3.5 -top-3">{{
              collectionList.length
            }}</span></router-link
          >
          <!-- 
          <router-link
            to="/favourites"
            class="font-display relative mr-9 text-darkgrey"
            >Favourites
            <span class="text-sm absolute -right-3.5 -top-3">0</span>
          </router-link> -->
        </div>

        <button
          @click="createNewCollection()"
          class="btn-purple-icon inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="12 -2 30 30"
            fill="none"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="overflow-visible"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>

          <span>Create new collection</span>
        </button>
      </div>

      <!-- for loop for collections -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <div v-for="collection in collectionList" :key="collection.id">
          <div class="h-24 bg-grey rounded hover:text-purple">
            <div class="p-5">
              <router-link :to="'/collection/' + collection.id">
                <p class="font-display text-lg">
                  {{ collection.title }}
                </p></router-link
              >
              <p class="font-body text-sm font-light">0 items</p>
            </div>
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
          mt-64
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
  props: ["user"],

  data() {
    return {
      collectionList: [],
    };
  },

  methods: {
    createNewCollection() {
      //console.log(this.user.sessionUserId);

      var collectionTitle = "";
      collectionTitle = prompt("Give a title to your new collection!", "");

      const collection = {
        title: collectionTitle,
        description: "",
        accountId: this.user.sessionUserId,
      };

      if (collectionTitle == "") {
        alert("Provide a collection title!");
      } else {
        client.createCollection(collection, (errors, id) => {
          if (errors.length == 0) {
            alert("Collection created!");
            this.getCollectionList();
          } else {
            alert(errors);
          }
        });
      }
    },

    //sign out without backend action
    signOut() {
      this.user.isSignedIn = false;
      this.user.sessionUserId = "";
      this.user.sessionUsername = "";
      //console.log("done");
      this.$router.push("/");
    },

    getCollectionList() {
      //alert(this.user.sessionUserId);

      var accountId = this.user.sessionUserId;

      if (!accountId) {
        alert("You are not logged in!");
      }

      client.getCollectionsByAccountId(accountId, (errors, collections) => {
        if (errors.length == 0) {
          this.collectionList = collections;
          this.user.collectionList = collections;
          //alert("Collection retrieved!");
          console.log(collections);
        } else {
          alert(errors);
        }
      });
    },
  },

  created() {
    this.getCollectionList();
  },
};
</script>