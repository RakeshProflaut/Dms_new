<template>
  <div class="folderContainer">
    <div class="pt-1 text-center card-header">
      <h5>Edit User Creation</h5>
    </div>
    <div class="newButton">
      <v-btn @click="deleteUser"> Delete </v-btn>
    </div>

    <div class="card-body">
      <form role="form">
        <div class="mb-3">
          <input
            id="name"
            type="text"
            placeholder="Name"
            aria-label="Name"
            v-model="userDetails.userName"
          />
        </div>
        <div class="mb-3">
          <input
            id="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            v-model="userDetails.email"
          />
        </div>
        <!-- <div class="mb-3">
            <input
              id="password"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div> -->
        <div class="mb-3">
          <input
            id="name"
            type="text"
            placeholder="Mobile Number"
            aria-label="Mobile Number"
            v-model="userDetails.mobileNo"
          />
        </div>
        <div class="mb-3">
          <input
            id="name"
            type="text"
            placeholder="Location"
            aria-label="Location"
            v-model="userDetails.location"
          />
        </div>
        <div class="switch">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <span>Admin Access</span>
          </div>
          <div>
            <v-switch
              v-model="userDetails.adminAccess"
              hide-details
              true-value="Y"
              false-value="N"
              color="blue"
              inset
            ></v-switch>
          </div>
        </div>
        <div class="switch">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <span>Web Access</span>
          </div>
          <div>
            <v-switch
              v-model="userDetails.webAccess"
              hide-details
              true-value="Y"
              false-value="N"
              color="blue"
              inset
            ></v-switch>
          </div>
        </div>

        <div class="switch">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <span>LDAP</span>
          </div>
          <div>
            <v-switch
              v-model="userDetails.ldap"
              hide-details
              true-value="Y"
              false-value="N"
              color="blue"
              inset
              class="custom-switch"
            ></v-switch>
          </div>
        </div>

        <div class="text-center">
          <button @click="submitData">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "edituserinfo",
  props: {
    userDetails: Object,
  },
  data() {
    return {
      showLoader: false,
    };
  },

  mounted() {
    console.log("userdetailsss", this.userDetails);
  },

  methods: {
    async submitData(event) {
      event.preventDefault();
      console.log("idddd", this.userDetails.userId);
      const apiUrl = `http://localhost:61050/dms/group/updateUsers/${this.userDetails.userId}`;
      const token = this.$store.getters.getUserToken;
      console.log("token", token);
      if (Object.values(this.userDetails).every((value) => value !== "")) {
        try {
          const response = await axios.put(apiUrl, this.userDetails, {
            headers: {
              token: token,
            },
          });
          this.$emit("showLoader", true);
          this.$emit("closeEditBox", false);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          });
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

    deleteUser(){
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
         this.toDelteUser()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          this.$emit("closeEditBox", false);
        }
      });
    },
    async toDelteUser() {
      const apiUrl = `http://localhost:61050/dms/access/updateUserStatus/${this.userDetails.userId}`;
      const token = this.$store.getters.getUserToken;
      console.log(token);
      await axios
        .put(apiUrl,{},{
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("respondedelte", response.data);
        })
        .catch((error) => console.log("error occured by", error));
    },

  },
};
</script>

<style scoped>
.folderContainer {
  height: 100%;
  width: 90%;
  margin: 0 auto;
}

.switch {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.switch > div {
  flex-basis: 50%;
}

.text-center > button {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 100% !important;
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
  left: 4%;
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
  background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2),
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
  content: "";
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

.newButton {
  display: flex;
  justify-content: flex-end;
  margin-right: 2%;
}
.newButton > .v-btn {
  background: #58bdff;
  transition: 0.5s ease;
  font-weight: bold;
  color: #fff;
  height: 2rem !important;
  font-size: 0.7rem !important;
}
.newButton > .v-btn:hover {
  cursor: pointer;
}
</style>
