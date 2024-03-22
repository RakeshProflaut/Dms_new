<template>
  <div>
    <!-- <div class="container-fluid">
      <div
        class="mt-4 page-header min-height-300 border-radius-xl"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
          backgroundPositionY: '50%',
        }"
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div> -->
      <!-- <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                src="@/assets/img/user.png"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">{{ this.$store.getters.getUserName }}</h5>
              <p class="mb-0 text-sm font-weight-bold">
                User Id-{{ this.$store.getters.getUserId }}
              </p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  -->
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row"  style="margin-top: .2rem !important;">
        <div class="col-12">
          <div class="card" style="height: 507px !important">
            <div class="card-header text-center pb-0 text-uppercase">
              <h4>Search Document</h4>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="upperBody">
                <div style="flex-basis: 30%;">
                  <div style="">
                    <label>Metadata*</label>
                    <v-select
                      variant="outlined"
                      style="width: 80%; font-size: 10px"
                      v-model="selectedMetadata"
                      :items="metaTables"
                      item-title="tableName"
                      item-value="metaId"
                      label="Select items"
                      chipstabelName
                      small-chips
                      clearable
                      class="custom-select"
                    >
                    </v-select>
                  </div>
                  <div class="newButton">
                    <v-btn @click="checkAndgetTable"> Search </v-btn>
                  </div>
                </div>
                <div class="textFields">
                  <div v-for="(fieldNam, index) in fieldNames" :key="index">
                    <label :for="fieldNam.fieldName">{{
                      fieldNam.fieldName
                    }}</label>
                    <input
                    :type="getFieldType(fieldNam.fieldType)"
                      :id="fieldNam.fieldName"
                      v-model="fieldNam.value"
                      style="width: 100% !important"
                      :required="true"
                      :readonly="showFirstPane"
                      :pattern="getFieldPattern(fieldNam)"
                       @input="validateField(fieldNam)"
                    />
                    <div class="warning-text">
                    {{ warnings[fieldNam.fieldName] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive" v-if="openSearchTable">
                <div class="tableContaier">
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
                    <tr
                      v-for="(data, rowIndex) in listrecords"
                      :key="rowIndex"
                    >
                      <td
                        :class="{
                          'font-weight-bolder text-uppercase':
                            header.key === 'folderName',
                        }"
                        v-for="(header, index) in headers"
                        :key="index"
                        style="text-align: center"
                      >
                        <template v-if="header.key === 'action'">
                          <v-btn
                            @click="openDocViewBox(data.document_details['id'])"
                            class="text-secondary font-weight-bold text-xs"
                            >View</v-btn
                          >
                        </template>

                        <template v-if="header.key === 'sno'">
                          {{ rowIndex+1 }}
                        </template>                   
                        <template v-else>
                          {{ data.document_details[header.key] }}
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div>
                  <v-pagination
                  v-model="page"
                  :length="pages"
                  @input="updateDisplayedData"
                  ></v-pagination>                
                </div>
              </div>
              </div>
            <v-dialog v-model="docViewBox"  style=" z-index: 1001">
              <div style="position: relative; left: 67%">
        <button class="closebtn" @click="docViewBox = false">
          <i class="bx bx-x" style="position: relative; top: 20%"></i>
        </button>
      </div>
        <v-card style="width: 35%;margin: 0 auto; border-radius: 3%">
          <view-file-vue
          :selectedDocId="selectedDocId"
          v-on:closeDocViewBox="closeDocViewBox"
          />
        </v-card>
      </v-dialog>      
      <!-- <v-dialog v-model="openUploadDialogeBox" 
        style=" z-index: 1001">
        <v-card style="width: 35%;margin: 0 auto; border-radius: 3%">
          <upload-file
          :selectedfolder="selectedfolder"                        
          v-on:closeUploadDialogeBox="closeUploadDialogeBox"
          />
        </v-card>
      </v-dialog> -->
    </div>
  </div>
</div>
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
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import axios from "axios";
import ViewFileVue from './ViewFile.vue';
import Swal from "sweetalert2";


export default {
  name: "search",
  components:{
    ViewFileVue
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    this.getMetaData();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  watch: {
    selectedMetadata(newVal, oldVal) {
      // Call your method here
      this.getFields();
    },
  },
  data() {
    return {
      selectedMetadata: null,
      metaTables: [],
      fieldNames: [],
      openSearchTable: false,
      docViewBox:false,
      selectedDocId:null,
      showLoader: false,
      fieldTypeWarnings: {
        integer: "Only accept Numbers",
        string: "Only accept Strings",
      },
      warnings: {},
      headers: [
        {
          key: "sno",
          title: "SNO",
        },
        {
          key: "docName",
          title: "FILE NAME",
        },
        {
          key: "createdBy",
          title: "CREATED BY",
        },
        {
          key: "uploadTime",
          title: "CREATED AT",
        },
        {
          key: "action",
          title: "Action",
        },
      ],
    };
  },
  methods: {
    async getMetaData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(`http://localhost:61050/dms/meta/getAllAccessMetaTable`, {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => {
          this.metaTables = response.data;
          console.log("metaaa", this.metaTables);
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getFields() {
      console.log("selectedMetaId", this.selectedMetadata);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/meta/getAllTables?id=${this.selectedMetadata}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          const filterdfiledNames = response.data.fieldNames.filter(
            (ele) => ele.fieldName !== "id" && ele.fieldName !== "doc_id"
          );
          const removevalues = filterdfiledNames.map((ele) => ({
            ...ele,
            value: null,
          }));
          this.fieldNames = removevalues;
          console.log("fieeldsssss", this.fieldNames);
        })
        .catch((error) => console.error("Error occured by", error));
    },


    checkAndgetTable(event){
      const searchObject = Array.from(this.fieldNames).map((ele) => ({
        [ele.fieldName]: ele.value,
      }));
      const mergedObject = searchObject.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});

      const isAtLeastOneValuePresent = Object.values(mergedObject).some(value => {
  return value !== null && value !== undefined && value !== '';
});
const hasWarnings = Object.values(this.warnings).every(
        (warning) => warning == ""
      );
      if (hasWarnings) {
      if(isAtLeastOneValuePresent){
          this.getTable(event);
      }else{  
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
          title: "Please fill Minimum One Field!",
        });
      }
      }
    },

    async getTable(event) {
      event.preventDefault();
      console.log("getmetafields", this.fieldNames);
      const token = this.$store.getters.getUserToken;


      const searchObject = Array.from(this.fieldNames).map((ele) => ({
        [ele.fieldName]: ele.value,
      }));
      const mergedObject = searchObject.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});

      const submitObject={
        metaData_id:this.selectedMetadata,
        metaData:mergedObject,
      }
      try {
        const response = await axios.post(
          "http://localhost:61050/dms/meta/searchDocument",
          submitObject, {
          headers: {
            token: token,
          },
        });
        console.log(response.data.records);
        this.showLoader = true;
        setTimeout(() => {
          this.listrecords=response.data.records;
            this.showLoader = false;
            this.openSearchTable =true;
           
          }, 3000);
      } catch (error) {
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
          title: "Incorrect  Details!",
        });
        console.error("API There was an error!", error);
      }
    },

    openDocViewBox(value){
      this.docViewBox=true;
      this.selectedDocId=value;
    },

    closeDocViewBox(value) {
      this.docViewBox = value;
    },

    getFieldType(fieldType) {
      return fieldType === "integer"? "number"
        : fieldType === "date"
          ? "datetime-local"
          : "text";
    },

    getFieldPattern(fieldNam) {
      switch (fieldNam.fieldType) {
        case "integer":
          return "^[0-9]+$";
        case "string":
          return "^(?=.*[a-zA-Z])[a-zA-Z0-9: -_]+$";
      }
    },

    validateField(fieldNam) {
      const value = fieldNam.value;
      const pattern = this.getFieldPattern(fieldNam);
      const regex = new RegExp(pattern);
      if (regex.test(value)) {
        // Input matches the pattern
        this.warnings[fieldNam.fieldName] = ""; // Clear warning
      } else {
        // Input does not match the pattern
        const fieldTypeWarning = this.fieldTypeWarnings[fieldNam.fieldType];
        this.warnings[fieldNam.fieldName] = fieldTypeWarning;
      }
    },
  },
};
</script>

<style scoped>
.min-height-300 {  
  min-height: 75px !important;
}
.card-body {
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
}
.upperBody {
  flex-basis: 30%;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}



/* div.card-body .v-input__control .v-field__field {
    max-height: 30px !important;
} */
input {
  display: block;
  width: 100% !important;
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
label {
  text-transform: uppercase;
}

.closebtn {
  width: 22px;
  height: 22px;
  color: #d11313;
  font-size: 30px;
  opacity: 1;
}

.closebtn:hover {
  opacity: .5;
}

.textFields {
  flex-basis: 64%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 5%;
  overflow-y: auto;
  width: 40%;
  height: 200px;
}


.newButton {
  display: flex;
  margin: 3% 0px;
  margin-right: 2%;
}
.newButton > .v-btn {
  background-image: linear-gradient(
    310deg,
    #82d616 0%,
    #82d616 360%
  ) !important;
  transition: 0.5s ease;
  font-weight: bold;
  color: #fff;
  font-weight: bold;
  font-size: 0.7rem !important;
  height: 2rem !important;  
}
.newButton > .v-btn:hover {
  cursor: pointer;
}

.table-responsive {
  display: flex;
  flex-direction: column;
}
.tableContaier {
  position: relative;
  height: 180px;
  overflow-x: auto;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
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

.warning-text {
  color: red;
  font-size: 10px;
}

::-webkit-scrollbar {
  width: 3px; /* width of the scrollbar */
  border-radius: 13px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* color of the track */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #87D81F; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}

</style>
