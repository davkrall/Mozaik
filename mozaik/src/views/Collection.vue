<template>
  <div id="app" class="mx-20">
    <header class="container flex justify-between items-center my-10">
      <router-link to="/home">
        <h1 class="text-4xl text-normal font-display">Mozaik</h1></router-link
      >
      <nav class="flex">
        <router-link :to="'/'"
          ><button class="btn-purple">Sign out</button></router-link
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
          <p class="font-display text-lg">
            {{ currentTitle }}
          </p>
        </div>
        <div>
          <button class="btn-outline-icon inline-flex items-center">
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
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>

            <span @click="deleteCollectionById()"> Delete collection</span>
          </button>

          <button
            @click="addNewImage()"
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

            <span>Add image</span>
          </button>
        </div>
      </div>

      <div v-for="image in imageList" :key="image.location">
        <div class="container mt-5">
          <img
            :src="'/images/' + image.location"
            alt="image"
          />
          <p class="font-display text-base mt-3 hover:text-purple">Remove</p>
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
      imageList: [],
      collectionId: this.$route.params.id,
      currentTitle: "",
    };
  },

  methods: {
    getImageList() {
      var accountId = this.user.sessionUserId;

      if (!accountId) {
        alert("You are not logged in!");
      }

      client.getImagesByCollectionId(this.collectionId, (errors, images) => {
        if (errors.length == 0) {
          this.imageList = images;
          //alert("Images retrieved!");
          console.log(this.imageList);
        } else {
          alert(errors);
        }
      });
    },

    addNewImage() {
      var imgUrl = "";
      imgUrl = prompt("Paste your image Url below!", "");

      const img = {
        url: imgUrl,
        collectionId: this.$route.params.id,
      };

      if (imgUrl == "") {
        alert("Provide an image URL!");
      } else {
        client.createImage(img, (errors, id) => {
          if (errors.length == 0) {
            //alert("Image added!");
            this.getImageList();
          } else {
            alert(errors);
          }
        });
      }
    },

    deleteCollectionById() {
      if (confirm("Are you sure you want to delete this collection?")) {
        client.deleteCollectionById(this.collectionId, (errors) => {
          if (errors.length == 0) {
            //alert("Collection deleted!");
            this.$router.push("/home");
          } else {
            alert(errors);
          }
        });
      }
    },

    getCurrentTitle() {
      var i = 0;
      for (i = 0; i < this.user.collectionList.length; i++) {
        if (this.user.collectionList[i].id == this.collectionId) {
          this.currentTitle = this.user.collectionList[i].title;
        }
      }
    },
  },

  created() {
    this.getImageList();
    this.getCurrentTitle();
  },
};
</script>
