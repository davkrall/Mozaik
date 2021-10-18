<template>
  <div id="app" class="mx-20">
    <header class="container flex justify-between items-center my-10">
      <h1 class="text-4xl text-normal font-display">Mozaik</h1>
      <nav class="flex">
        <router-link :to="'/signin/'"
          ><button class="btn-outline justify-end">Sign in</button></router-link
        >
        <router-link :to="'/registration/'"
          ><button class="btn-purple">Register</button></router-link
        >
      </nav>
    </header>

    <main>
      <div class="container flex items-start my-28">
        <p class="text-xl font-display pr-96">
          Creative <br />
          space for <br />
          your ideas
        </p>

        <p class="text-base font-body font-light leading-7">
          Hello designer, this web application offers you a creative space where
          you <br />
          can upload and store collection of images as your source of
          inspiration. <br />
          Say goodbye to messy, and scattered moodboards across multiple
          applications. <br />
          Let Mozaik do the hard work so you can focus on great ideas.
        </p>
      </div>

      <div class="w-full content-center my-28">
        <img class="relative" src="../assets/cover-image.png" alt="img6" />
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
  </div>
</template>
