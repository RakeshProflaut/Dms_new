<template>
  <v-card style="width: 28%; border-radius: 3%">
    <div>
      <div class="container" style="width: 100%; height: 100%">    
        <div class="pt-10 text-center card-header">
          <h5> Edit Group</h5>
        </div>
        <div class="newButton">
         <v-btn @click="deleteGroup"> Delete </v-btn>
        </div>
        <div class="card-body">
          <form role="form">
            <div class="mb-3">
              <input
                id="name"
                type="text"
                placeholder="Name"
                aria-label="Name"
                v-model="groupDetails.groupName"
              />
            </div>
            <div class="text-center">
              <button @click="submitData">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
    name:'editGroupInfo',
    props: {
    groupDetails: Object,
  },
  data() {
    return {
      showLoader: false,
    };
  },

  mounted() {
    console.log("userdetailsss", this.groupDetails);
  },
  methods:{
    async submitData(event) {
      event.preventDefault();
      console.log("idddd", this.groupDetails.id);
      const apiUrl = `http://localhost:61050/dms/group/update/${this.groupDetails.id}`;
      const token = this.$store.getters.getUserToken;
      if (this.groupDetails.groupName !=="") {
        try {
          const response = await axios.put(apiUrl, this.groupDetails, {
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

    deleteGroup(){
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this group",
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
            text: "Group has been deleted.",
            icon: "success",
          });
          this.$emit("closeEditBox", false);
        }
      });
    },
    async toDelteUser() {
      const apiUrl = `http://localhost:61050/dms/group/updateGroupStatus/${this.groupDetails.id}`;
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
  }
};
</script>

<style scoped>

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

.text-center > button {
  color: #fff;
  border: 0;
  cursor: pointer;
  width: 50% !important;
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
