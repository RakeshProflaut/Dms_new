<template>
  <!-- Navbar -->
  <nav
    class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"
  >
    <div class="container">    
      <span
        class="navbar-brand font-weight-bolder ms-lg-0 ms-3  align-self-center"
        :class="isBlur ? 'text-dark' : 'text-white'"
      >
      <img class="logoImg" src="logo-ct.png"/>
        PROFLAUT
      </span>
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class=" navbar-collapse" id="navigation">
        <ul class="navbar-nav mx-auto">     
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/adminSign-in">
              <i
                class="fas fa-key opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
               Admin Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/sign-in">
              <i
                class="fas fa-key opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
              Sign In
            </router-link>
          </li>
        </ul>       
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import SidenavCollapse from "../AdminSidenav/SidenavCollapse.vue";


export default {
  name: "navbar",
  data() {
    return {
      downArrWhite,
      downArrBlack,
    };
  },
  components:{
    SidenavCollapse,
  },
  props: {
    btnBackground: String,
    isBlur: String,
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },
};
</script>

<style scoped>
#app > main > div.container.top-0.position-sticky.z-index-sticky > div > div > nav{
  width: 45%;
}

.navbar-vertical .navbar-brand > img, .navbar-vertical .navbar-brand-img {
    max-width: 108%;
    max-height: 3rem !important;
}
.logoImg{
  width: 35px;
}
</style>
