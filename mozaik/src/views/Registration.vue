<template>
    <div id="app" class="mx-20">
    <div class="items-center border-b border-black">
    <header class="container flex justify-between items-center mt-10 mb-5">
      <router-link to="/"> <h1 class="text-4xl text-normal font-display">Mozaik</h1></router-link>
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
      <p class="text-base font-body text-black mt-6">Register an acccount with Facebook</p>
  
      <img src="../assets/facebook-icon.png" alt="facebook icon" class="w-12 h-12 mt-8 mb-5">
      <p class="my-3"> OR</p>
      
      <form>
      <label for="username" class="font-display text-base pl-4">Username</label><br>
      <input id="username" type="text" placeholder="Example: Katiedesign" class="input"><br>
       <label for="password"  class=" font-display text-base pl-4">Password</label><br>
       <input id="password" type="password" placeholder="Must include 8 characters" class="input"><br>
       <label for="position"  class="font-display text-base pl-4">Work position</label><br>
       <input id="position" type="text" placeholder="Example: Product designer" class="input mb-10"><br>
      </form>

      <p class="mb-3">Profile picture</p>

      <button class="btn-outline-icon inline-flex items-center mb-14">
      <svg class="w-4 h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
        <span>Upload profile picture</span>
      </button>

      <div>
        <router-link :to="'/signin'"><button class="btn-outline">Sign in</button></router-link>
        <router-link :to="'/signin2'"><button class="btn-purple">Register</button></router-link>
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
