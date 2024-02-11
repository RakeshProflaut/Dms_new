<template>
  <div>
    <div class="card mb-4" style="height: 484px !important">
      <div class="newButton">
        <v-btn @click="openDialogeBox = true"> New </v-btn>
      </div>
      <div class="card-header pb-2">
        <h3>Group Information</h3>
      </div>
      <div class="card-body px-0 pt-1 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead class="table-header">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.key"
                  class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, rowIndex) in displayedData" :key="rowIndex">
                <td
                  :class="{
                    'font-weight-bolder text-uppercase':
                      header.key === 'groupName',
                  }"
                  v-for="(header, index) in headers"
                  :key="index"
                  style="text-align: center"
                >
                    {{ data[header.key] }}
                </td>
              </tr>
            </tbody>
          </table>
          <v-pagination
            v-model="page"
            :length="pages"
            @input="updateDisplayedData"
          ></v-pagination>
        </div>
      </div>
      <v-dialog
        v-model="openDialogeBox"
        style="display: flex; padding-left: 73%; z-index: 1001"
      >
        <v-card style="width: 28%; border-radius: 3%">
          <div>
            <div class="container" style="width: 100%; height: 100%">
              <div>
                <button class="closebtn" @click="openDialogeBox = false">
                  <i class="bx bx-x" style="position: relative; top: 20%"></i>
                </button>
              </div>
              <div class="pt-10 text-center card-header">
                <h5>Group Registration</h5>
              </div>
              <div class="card-body">
                <form role="form">
                  <div class="mb-3">
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      aria-label="Name"
                      v-model="enteredGroupName"
                    />
                  </div>
                  <div class="text-center">
                    <button @click="submitGroupName">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "groupInfo",
  data() {
    return {
      page: 1, // Current page
      itemsPerPage: 10, // Number of items per page
      headers: [
        { key: "id", title: "ID" },
        { key: "groupName", title: "GROUP NAME" },
        { key: "createdBy", title: "CREATED BY" },
        { key: "createdAt", title: "CREATED AT" },
      ],
      openDialogeBox: false,
      groupDatas: [],
      enteredGroupName: "",
    };
  },
  mounted() {
    this.getGroupData();
  },

  watch: {
    page(newValue, oldValue) {
      console.log("Page changed to:", newValue);
      this.updateDisplayedData();
    },
  },
  computed: {
    displayedData() {
      console.log("displa data rendering");
      const start = (this.page - 1) * this.itemsPerPage;
      console.log("start", start);
      const end = start + this.itemsPerPage;
      console.log("end", start);

      return this.groupDatas.slice(start, end);
    },
    pages() {
      console.log(Math.ceil(this.groupDatas.length / this.itemsPerPage));
      return Math.ceil(this.groupDatas.length / this.itemsPerPage);
    },
  },
  methods: {
    updateDisplayedData() {
      // Your logic to update displayed data based on the new page number
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedData = this.groupDatas.slice(start, end);
    },
    async getGroupData() {
      console.log(
        "group Mangament user token",
        this.$store.getters.getUserToken
      );
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/group/getAllGroup`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("res", response.data);
          this.groupDatas = response.data;
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async submitGroupName(event) {
      if (this.enteredGroupName !== "") {
        const token = this.$store.getters.getUserToken;
        event.preventDefault();
        const groupData = {
          createdBy: this.$store.getters.getAdminName,
          groupName: this.enteredGroupName,
        };
        console.log("group Data", groupData);
        axios
          .post("http://localhost:61050/dms/group/create?=", groupData, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            this.openDialogeBox = false;
            console.log("status:", response);
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
              title: "Group Added successfully",
            });
            this.dialogDelete = false;
            this.getGroupData();
          })
          .catch((error) => {
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
              title: "Group Name Already Exist!",
            });
            console.error("API There was an error!", error);
            // }
          });
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
          title: "Please Fill the Fields!",
        });
      }
    },
  },
};
</script>

<style scoped>
.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background: #58bdff;
  transition: 0.5s ease;
  color: #fff;
}
.newButton > .v-btn:hover {
  cursor: pointer;
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

.table-responsive {
  height: 350px;
  position: relative;
  overflow-x: auto;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
</style>
