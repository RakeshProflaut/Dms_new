<template>
  <div  style="height: 100vh;display: flex;justify-content: center;align-items: center;">
    <v-container>
      <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card style="border-radius: 1.5rem">
          <v-img src="/logo-ct.png" class="mx-auto" max-height="100"></v-img>
          <v-card-title class="text-center">
            <span class="headline font-weight-bold fs-7">Reset Password</span>
          </v-card-title>
          <div v-if="currentStep === 0" class="center-inner-card">
            <v-card class="elevation-5 transparent-card">
              <v-card-text class="text-center">
                Enter your user account's verified email address and we will
                send you a Otp
              </v-card-text>
              <!-- Email input -->
              <v-card-text>
                <div class="mb-3 d-flex justify-content-center">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    v-model="email"
                  />
                </div>
              </v-card-text>

              <!-- Send OTP button -->
              <v-card-actions class="justify-center newButton">
                <v-btn @click="sendEmail">{{ resendButtonLabel }}</v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-if="currentStep === 1" class="center-inner-card">
            <v-card class="elevation-5 transparent-card">
              <v-card-text class="text-center mt-3">
                Enter the OTP received on your email
              </v-card-text>
              <v-card-text>
                <div class="mb-3 d-flex justify-content-center">
                  <input
                    id="otp"
                    type="num"
                    v-model="otpValue"
                    maxlength="6"
                    placeholder="XXX XXX"
                    aria-label="OTP"
                    @change="formatOtp"
                  />
                </div>
              </v-card-text>
              <!-- Verify button -->
              <v-card-actions class="justify-center newButton">
                <v-btn @click="verifyOTP">Verify</v-btn>
              </v-card-actions>
              <div class="d-flex justify-content-center">
                <p class="font-weight-bold fs-0">
                  Time left: {{ formattedTime }}
                </p>
              </div>
            </v-card>
          </div>
          <div v-if="currentStep === 2" class="center-inner-card">
            <v-card class="elevation-5 transparent-card">
              <v-card-text class="text-center mt-3">
                Set Your New Password
              </v-card-text>
              <v-card-text>
                <div class="mb-3 input-with-icon">
                  <div class="passwordContainer d-flex justify-content-center">
                    <input
                    id="otp"
                      :type="isVisible ? 'password' : 'text'"
                      v-model="newPassword"
                      placeholder="New Password"
                      aria-label="OTP"
                      @input="validatePassword"
                      />
                    </div>
                  <span class="eyeIcon">
                    <i id="visiblityBtn" @click="toggleVisibility">
                      <span
                        style="font-size: 19px"
                        id="eyeicon"
                        class="material-symbols-outlined"
                        >{{ isVisible ? "visibility_off" : "visibility" }}</span
                      >
                    </i>
                  </span>
                </div>
                <div v-if="showPasswordWarning" class="warning-text">
                  Password must contain at least 8 characters, 1 uppercase
                  letter, 1 special character, and 1 number.
                </div>
                <div class="mb-3 d-flex justify-content-center">
                  <input
                  id="otp"
                    type="password"
                    v-model="confirmPassword"
                    placeholder="Confirm Password"
                    aria-label="OTP"
                    @change="validatePasswordMatch"
                  />
                </div>
                <div v-if="!passwordsMatch" class="warning-text">
                  Passwords do not match.
                </div>
              </v-card-text>
              <!-- Verify button -->
              <v-card-actions class="justify-center newButton">
                <v-btn @click="submitPassword">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="showLoader" class="loader-overlay">
      <div v-if="showLoader" class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="bg"></div>
    </div>
  </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      confirmPassword: "",
      newPassword: "",
      otpValue: null,
      currentStep: 0,
      showLoader: false,
      timeLeft: 60, // 5 minutes in seconds
      timer: null,
      hasSentOTP: false,
      showPasswordWarning: false,
      passwordsMatch: true,
      isVisible: false,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${this.pad(minutes)}:${this.pad(seconds)}`;
    },
    resendButtonLabel() {
      return this.hasSentOTP ? "Resend OTP" : "Send OTP";
    },
  },
  methods: {
    async sendEmail() {
      const apiUrl = `http://localhost:61050/dms/access/forgotPassword?mailId=${this.email}`;
      const token = this.$store.getters.getUserToken;
      this.showLoader = true;
      await axios
        .post(
          apiUrl,
          {},
          {
            headers: {
              token: token,
            },
          }
        )
        .then((response) => {
          console.log("respondedelte", response.data);
          this.hasSentOTP = !this.hasSentOTP;
          this.showLoader = false;
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
            title: "Otp Sent Successfully",
          });
          this.startTimer();
          this.currentStep = 1;
        })
        .catch((error) => {
          this.showLoader = false;
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          });
        });
    },
    async verifyOTP() {
      console.log("mail", this.email);
      const postOtp = {
        email: this.email,
        otp: this.otpValue,
      };
      const apiUrl = `http://localhost:61050/dms/access/verifyOtp`;
      const token = this.$store.getters.getUserToken;
      this.showLoader = true;
      await axios
        .post(apiUrl, postOtp, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("respondedelte", response.data);
          setTimeout(() => {
            this.showLoader = false;
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
              title: "Otp Verified Successfully",
            });
            this.currentStep = 2;
            clearInterval(this.timer);
          }, 3000);
        })
        .catch((error) => {
          this.showLoader = false;
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errorMessage,
          });
        });
    },
    async submitPassword() {
      console.log("mail", this.email);
      const postOtp = {
        email: this.email,
        password: this.newPassword,
      };
      const apiUrl = `http://localhost:61050/dms/access/savePassword`;
      const token = this.$store.getters.getUserToken;

      if (this.passwordsMatch && !this.showPasswordWarning) {
        this.showLoader = true;
        await axios
          .post(apiUrl, postOtp, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            console.log("respondedelte", response.data);
            setTimeout(() => {
              this.showLoader = false;
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
                title: "Password Changed Successfully",
              });
              this.$router.push("/sign-in");
            }, 3000);
          })
          .catch((error) => {
            this.showLoader = false;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.errorMessage,
            });
          });
      } else {
        alert("make crt pattern");
      }
    },

    validatePassword() {
      const password = this.newPassword;
      // Regular expression for password validation
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
      if (passwordRegex.test(password)) {
        // Password meets the criteria
        this.showPasswordWarning = false;
      } else {
        // Password does not meet the criteria
        this.showPasswordWarning = true;
      }
      console.log("showPasswordWarning", this.showPasswordWarning);
    },

    validatePasswordMatch() {
      this.passwordsMatch = this.newPassword === this.confirmPassword;
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.currentStep = 0;
          Swal.fire({
            icon: "info",
            title: "OTP is Expired",
          });
        }
      }, 1000); // Update timer every second
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 300; // Reset timer to 5 minutes
    },
    pad(value) {
      return value < 10 ? "0" + value : value;
    },
    sendOrResendOTP() {
      if (this.hasSentOTP) {
        // Implement resend OTP logic here
      } else {
        // Implement send OTP logic here
        this.hasSentOTP = true; // Set flag to true after sending OTP
      }
      // Start or restart the timer
      this.startTimer();
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.transparent-card {
  background-color: transparent !important;
  box-shadow: none !important;
}

.elevation-5 {
  width: 80%;
}
.center-inner-card {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.mb-3 > input {
  display: block;
  width: 70%;
  padding: 0.6rem 0.75rem;
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
.input-with-icon {
  position: relative;
}
.passwordContainer {
  position: relative;
}

.passwordContainer > input {
  display: block;
  width: 60%;
  padding: 0.6rem 0.75rem;
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


.newButton > .v-btn {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 30% !important;
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

.newButton > .v-btn:hover {
  cursor: pointer;
}

.eyeIcon {
  position: absolute;
  right: 108px;
  transform: translateY(-120%);
  cursor: pointer;
}

.warning-text {
  color: red;
  font-size: 10px;
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
</style>
