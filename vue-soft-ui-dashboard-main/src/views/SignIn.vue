<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
        is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
        />         
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg min-vh-100">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start" style="margin-top: 12%">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    Welcome back to Sign In Page
                  </h3>
                  <p class="mb-0">Enter your username and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Username</label>
                    <input
                    type="text"
                    v-model="user.userName"
                      placeholder="Username"
                      name="username"
                    />
                    <label>Password</label>
                    <div class="input-with-icon">
                      <div class="passwordContainer">
                        <input
                        :type="isVisible ? 'password' : 'text'"
                        v-model="user.password"
                        placeholder="Password"
                        name="password"
                        />
                      </div>
                      <span class="eyeIcon"> 
                        <i id="visiblityBtn" @click="toggleVisibility">
                          <span  style="font-size: 19px;" id="eyeicon" class="material-symbols-outlined">{{
                            isVisible ? "visibility_off" : "visibility"
                          }}</span>
              </i>
            </span>
          </div>
                    <soft-switch id="rememberMe" name="rememberMe"  @input="handleSwitchInput" checked >                      
                      Force Login
                    </soft-switch>
                    <div class="text-center">
                      <router-link
                  :to="{ name: 'Dashboard' }"
                  class="text-dark font-weight-bolder"
                >
                      <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        @click="createPost"
                        >Sign in
                      </soft-button>
                      </router-link>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                      <router-link
                      :to="{ name: 'AdminSign In' }"
                      class="text-success text-gradient font-weight-bold"
                      >Admin Sign In</router-link
                    >
                    <a style="margin-left: 2%;" href="/forgot-password" 
                    >Forgot Password?</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100   d-md-block d-none"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div v-if="showLoader" class="loader-overlay">
  <div  v-if="showLoader" class="loader">
  <div class='circle'></div>
  <div class='circle'></div>
  <div class='circle'></div>
  <div class='circle'></div>  
  <div class='circle'></div>
</div>
  <div class="bg"></div>
</div>
  <app-footer />
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,
    SoftSwitch,
    SoftButton,
  },
  data(){
    return{
      showLoader: false,
      isVisible: true,
      user:{
        userName: "",
        password: "",
        useForceLogin:"N",

      },
    }
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),

    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    async createPost(event) {
      console.log(this.user);
      if (this.user.userName !== "" && this.user.password !== "") {
        event.preventDefault();
        try{
          const response= await axios.post("http://localhost:61050/dms/access/login", this.user);
          this.showLoader = true;
          console.log("loader",this.showLoader);
          await new Promise(resolve => setTimeout(resolve, 3000));
            this.$store.commit("setReachedLandingPage", true);
            this.$store.commit("userToken", response.data.token);
            this.$store.commit("userId", response.data.userId);
            this.$store.commit("userName", this.user.userName);
            this.$store.commit("templeteStatus", "user");
            
            console.log("token", this.$store.getters.getUserToken);
            console.log("userId", this.$store.getters.getUserId);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              background: "#4fb945",
              color: "white",
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            this.$router.push(`/userBoard`);
        }
          catch(error) {       
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                customClass: "swal-wide",
                height: "30px",
                background: "hsl(0, 43%, 52%)",
                color: "white",
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "warning",
                title:error.response.data.errorMessage,});
              console.error("API There was an error!", error);
          
      }
     } else {
        event.preventDefault();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          customClass: "swal-wide",
          height: "30px",
          background: "hsl(0, 43%, 52%)",
          color: "white",
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Please Fill all the Fields!",
        });
      }
    },
    handleSwitchInput(newValue) {
      this.user.useForceLogin = newValue;
    },
  },
};
</script>

<style scoped>

.text-start >input{
  display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.5rem;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
}
#app > main > main > section > div > div > div > div:nth-child(2) > div > div{
  transform: none;
}
.input-with-icon{
  position: relative;

}
.passwordContainer{
  position: relative;
}
.passwordContainer >input{ 
  display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.5rem;
}

.eyeIcon{
  position: absolute;
  top: 60%;
  right: 10px; 
  transform: translateY(-50%);
  cursor: pointer;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.76);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50px;
  height: 50px;
  margin: auto;
  background: 
    var(--c), var(--r1), var(--r2),
    var(--c), var(--r1), var(--r2),
    var(--c), var(--r1), var(--r2);
  background-repeat: no-repeat;
  animation: l2 5s infinite alternate;
}

.loader .circle {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  transform: rotate(225deg);
  animation-iteration-count: infinite;
  animation-name: orbit;
  animation-duration: 5.5s;
}
.loader .circle:after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  background: #fff;
}
.loader .circle:nth-child(2) {
  animation-delay: 240ms;
}
.loader .circle:nth-child(3) {
  animation-delay: 480ms;
}
.loader .circle:nth-child(4) {
  animation-delay: 720ms;
}
.loader .circle:nth-child(5) {
  animation-delay: 960ms;
}
.loader .bg {
  position: absolute;
  width: 70px;
  height: 70px;
  margin-left: -16px;
  margin-top: -16px;
  border-radius: 13px;
  background-color: rgba(0, 153, 255, 0.69);
  animation: bgg 46087ms ease-in alternate infinite;
}
@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }
  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }
  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }
  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }
  76% {
    transform: rotate(945deg);
    opacity: 0;
  }
  100% {
    transform: rotate(945deg);
    opacity: 0;
  }
}
</style>
