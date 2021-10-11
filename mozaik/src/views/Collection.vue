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
          <p class="font-display text-lg">Andrea Johansson</p>
          <p class="font-body font-light text-sm">Product designer</p>
        </div>
      </div>

      <div class="container flex justify-between items-center">
        <div>
          <p class="font-display text-lg">Your collection name</p>
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

            <span> Delete collection</span>
          </button>

          <button class="btn-purple-icon inline-flex items-center">
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

      <div class="container mt-5">
        <div class="w-1/4 h-80 bg-grey rounded-sm"></div>
        <p class="font-display text-base mt-3 hover:text-purple">Remove</p>
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

    <!--  <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    <!--  <router-view/> -->
  </div>
</template>

<style scoped>
.offset {
  text-underline-offset: 3em;
}
</style>
