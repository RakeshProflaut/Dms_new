<template>
  <div>
    <div class="container" style="width: 100%; height: 100%">
      <div>
        <button class="closebtn" @click="$emit('closeDialogeBox', false)">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
      <div class="pt-10 text-center card-header">
        <h5>User Registration</h5>
      </div>

      <div class="card-body">
        <form role="form">
          <div class="mb-3">
            <input
              id="name"
              type="text"
              placeholder="Name"
              aria-label="Name"
              v-model="userdetails.userName"
            />
          </div>
          <div class="mb-3">
            <input
              id="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              v-model="userdetails.email"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="userdetails.password"
              id="password"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>
          <div class="mb-3">
            <input
              id="name"
              type="text"
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              v-model="userdetails.mobileNo"
            />
          </div>
          <div class="mb-3">
            <input
              id="name"
              type="text"
              placeholder="Location"
              aria-label="Location"
              v-model="userdetails.location"
            />
          </div>
          <div class="mb-3">
            <div class="checkbox-wrapper-34">
              <span>Admin Access</span>
              <input
                class="tgl tgl-ios"
                id="toggle-34"
                type="checkbox"
                @change="updateAdminAccess"
              />
              <label class="tgl-btn" for="toggle-34"></label>
            </div>
          </div>
          <div class="mb-3">
            <div class="checkbox-wrapper-35">
              <span>Web Access</span>
              <input
                class="tgl tgl-ios"
                id="toggle-35"
                type="checkbox"
                @change="updateWebAccess"
              />
              <label class="tgl-btn" for="toggle-35"></label>
            </div>
          </div>

          <div class="text-center">
            <button @click="submitData">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <!-- <div  class="loader-overlay">
  <div  v-if="showLoader" class="loader">
  <div class='circle'></div>
  <div class='circle'></div>
  <div class='circle'></div>
  <div class='circle'></div>
  <div class='circle'></div>
</div>
  <div class="bg"></div>
</div>     -->
  </div>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import Swal from "sweetalert2";
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "SignupBasic",
  props: {
    getUserInfo: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showLoader: false,
      userdetails: {
        userName: "",
        email: "",
        webAccess: "N",
        adminAccess: "N",
        location: "",
        mobileNo: "",
      },
    };
  },
  components: {
    Navbar,
    AppFooter,
    SoftInput,
    SoftCheckbox,
    SoftButton,
  },

  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),

    async submitData(event) {
      event.preventDefault();
      const apiUrl = "http://localhost:61050/dms/access/signup";
      const token = this.$store.getters.getUserToken;
      console.log("token", token);
      if (Object.values(this.userdetails).every((value) => value !== "")) {
       
        try {          
          const response = await axios.post(apiUrl, this.userdetails, {
            headers: {
              token: token,
            },
          });          
          this.$emit('showLoader',true);        
          this.getUserInfo();  
          this.$emit("closeDialogeBox", false);
        } catch (error) {
          console.error("Error occured byyy", error);
        }
      } else {
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
          onBeforeOpen: (toast) => {
            toast.style.zIndex = 10000;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Please Fill all the Fields!",
        });
      }
    },
    updateWebAccess() {
      this.userdetails.webAccess =
        this.userdetails.webAccess === "N" ? "Y" : "N";
      console.log("web", this.userdetails.webAccess);
    },
    updateAdminAccess() {
      this.userdetails.adminAccess =
        this.userdetails.adminAccess === "N" ? "Y" : "N";
    },
  },
};
</script>

<style scoped>
.checkbox-wrapper-35 {
  display: flex;
  width: 80%;
  justify-content: space-between;
  --blue: #55b6f6;
  --g08: #e1e5eb;
  --g04: #848ea1;
}

.checkbox-wrapper-35 > span {
  flex-basis: 50%;
}

.checkbox-wrapper-35 .tgl {
  display: none;
}
.checkbox-wrapper-35 .tgl,
.checkbox-wrapper-35 .tgl:after,
.checkbox-wrapper-35 .tgl:before,
.checkbox-wrapper-35 .tgl *,
.checkbox-wrapper-35 .tgl *:after,
.checkbox-wrapper-35 .tgl *:before,
.checkbox-wrapper-35 .tgl + .tgl-btn {
  box-sizing: border-box;
}
.checkbox-wrapper-35 .tgl::selection,
.checkbox-wrapper-35 .tgl:after::selection,
.checkbox-wrapper-35 .tgl:before::selection,
.checkbox-wrapper-35 .tgl *::selection,
.checkbox-wrapper-35 .tgl *:after::selection,
.checkbox-wrapper-35 .tgl *:before::selection,
.checkbox-wrapper-35 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-35 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:after,
.checkbox-wrapper-35 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-35 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 7px;
}
.checkbox-wrapper-35 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
}

.checkbox-wrapper-35 .tgl-ios + .tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fff;
  transition:
    left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease,
    margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:before {
  content: "No";
  left: 28px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn {
  background: var(--blue);
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-35 .tgl-ios:checked + .tgl-btn:before {
  content: "Yes";
  left: 4px;
  color: #fff;
}

.checkbox-wrapper-34 {
  display: flex;
  width: 80%;
  justify-content: space-between;
  --blue: #55b6f6;
  --g08: #e1e5eb;
  --g04: #848ea1;
}

.checkbox-wrapper-34 .tgl {
  display: none;
}
.checkbox-wrapper-34 .tgl,
.checkbox-wrapper-34 .tgl:after,
.checkbox-wrapper-34 .tgl:before,
.checkbox-wrapper-34 .tgl *,
.checkbox-wrapper-34 .tgl *:after,
.checkbox-wrapper-34 .tgl *:before,
.checkbox-wrapper-34 .tgl + .tgl-btn {
  box-sizing: border-box;
}
.checkbox-wrapper-34 .tgl::selection,
.checkbox-wrapper-34 .tgl:after::selection,
.checkbox-wrapper-34 .tgl:before::selection,
.checkbox-wrapper-34 .tgl *::selection,
.checkbox-wrapper-34 .tgl *:after::selection,
.checkbox-wrapper-34 .tgl *:before::selection,
.checkbox-wrapper-34 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-34 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after,
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 7px;
}
.checkbox-wrapper-34 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
}

.checkbox-wrapper-34 .tgl-ios + .tgl-btn {
  background: var(--g08);
  border-radius: 20rem;
  padding: 2px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fff;
  transition:
    left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease,
    margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:before {
  content: "No";
  left: 28px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn {
  background: var(--blue);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:before {
  content: "Yes";
  left: 4px;
  color: #fff;
}

.text-center > button {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 100% !important;
  margin-bottom: 8px !important;
  letter-spacing: -0.025rem;
  text-transform: uppercase;
  background-size: 150%;
  background-position-x: 25%;
  background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
  margin-top: 16px !important;
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
}

.mb-3 > input {
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
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.body
  > div.v-overlay-container
  > div
  > div.v-overlay__content
  > div
  > div.container
  > div
  > div
  > div
  > div.card-body {
  position: relative !important;
  background: #fff;
  z-index: 1 !important;
  /* top:-206px */
}

.container {
  position: relative;

  top: -15px;
}

.closebtn {
  position: relative;
  left: 6%;
  float: right;
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 0.3;
}

.closebtn:hover {
  opacity: 1;
}

.body > div.v-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loader-overlay {
  position: fixed; /* Change to fixed */
  top: 0;
  left: 0;
  width: 100%; /* Use viewport width */
  height: 100%; /* Use viewport height */
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
