<template>
  <div style="display: flex; flex-direction: column">    
    <div class="pt-1 text-center card-header">
      <h5>Metadata Creation</h5>
    </div>

    <div class="card-body px-0 pt-0 pb-2">
      <div style="display: flex; width: 100%; justify-content: space-between">
        <div class="tableExtension">
          <div>
            <label>Name</label>
            <input type="text" v-model="tableName" placeholder="Name" />
          </div>
          <div style="margin-right: 5%">
            <label>File Extensions</label>
            <v-select
              variant="underlined"
              style="width: 54%; font-size: 10px"
              v-model="selectedItems"
              :items="selectedOptions"
              item-title="text"
              label="Select items"
              multiple
              chipstabelName
              small-chips
              clearable
              class="custom-select"
            >
            </v-select>
          </div>
        </div>
        <div class="addButton">
          <v-btn @click="addEmptyRow"> Add </v-btn>
          <v-btn @click="postTable"> Save </v-btn>
        </div>
      </div>

      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="header.key"
                :class="{
                  'text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10':
                    index !== 5,
                  'text-secondary opacity-7': index === 4,
                }"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, rowIndex) in fields" :key="rowIndex">
              <td v-for="header in headers" :key="header.key">
                <template v-if="header.key === 'fieldType'">
                  <select name="fieldType" id="" v-model="item[header.key]">
                    <option value="" disabled selected>Select Data Type</option>
                    <option value="string">STRING</option>
                    <option value="integer">INTEGER</option>
                    <option value="date">DATE</option>
                  </select>
                </template>
                <template v-else-if="header.key === 'mandatory'">
                  <select name="mandatory" id="" v-model="item[header.key]">
                    <option value="" disabled selected>Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="NO">No</option>
                  </select>
                </template>
                <template v-else-if="header.key === 'maxLength'">
                  <input type="number" v-model="item[header.key]" />
                </template>
                <template v-else>
                  <input type="text" v-model="item[header.key]" />
                </template>
              </td>
              <td>
      <button @click="deleteRow(rowIndex)">
        <!-- Add your delete icon here -->
        <!-- For example, using Font Awesome delete icon -->
        <i style="color: red;" class="fas fa-trash-alt"></i>
      </button>
    </td>
            </tr>
          </tbody>
        </table>
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "metaDataTable",
  data() {
    return {
      selectedTabs: null,
      selectedItems: [],
      tableName: "",
      search: "",
      showLoader: false,
      fields: [],
      headers: [
        {
          key: "fieldName",
          title: "FIELD NAME",
        },
        {
          key: "fieldType",
          title: "FIELD TYPE",
        },
        {
          key: "mandatory",
          title: "MANDATORY",
        },
        {
          key: "maxLength",
          title: "MAXIMUM LENGTH",
        },
      ],
      selectedOptions: [
        {
          text: "Word(docx)",
          value: "docx",
        },
        {
          text: "PDF",
          value: "pdf",
        },
        // {
        //   text: "Text(txt)",
        //   value: "txt",
        // },
        {
          text: "Excel(xls)",
          value: "xls",
        },
        {
          text: "Excel(xlsx)",
          value: "xlsx",
        },
        {
          text: "JPG",
          value: "jpg",
        },
        {
          text: "JPEG",
          value: "jpeg",
        },
        {
          text: "PNG",
          value: "png",
        },
        // Add more options as needed
      ],
    };
  },
  methods: {
    addEmptyRow() {
      const emptyRow = {};
      this.headers.forEach((header) => {
        emptyRow[header.key] = "";
      });
      this.fields.push(emptyRow);
    },

    dialogeBoxtoggle() {
      this.$emit("dialogeBox", false);
    },

    deleteRow(rowIndex){
      this.fields.splice(rowIndex)
    },
    async postTable(event) {
      console.log("field", this.fields);
      console.log("name", this.tableName);
      const allFieldsFilled = this.fields.every((row) => {
        return Object.values(row).every((value) => value !== "");
      });
      const extension = this.selectedItems.join(",");
      console.log("selected", extension);
      const token = this.$store.getters.getUserToken;
      const postDetails = {
        fileExtension: extension,
        tableName: this.tableName,
        fields: this.fields,
      };

      if (allFieldsFilled && this.tableName && this.selectedItems != "") {
        event.preventDefault();
        await axios
          .post("http://localhost:61050/dms/meta/createTable", postDetails, {
            headers: {
              token: token,
            },
          })
          .then(() => {
            this.$emit("showLoader", true);
            this.$emit("dialogeBox", false);
          })
          .catch((error) => {
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
          title: "Please Fill all the Fields!",
        });
      }
    },
  },
};
</script>

<style scoped>
.card-body {
  min-height: 500px;
  overflow: auto;
}

.addButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;
}
.addButton > .v-btn {
  margin-left: 3%;
  background: #58bdff;
  color: #fff;
  transition: 0.5s ease;
}
.addButton > .v-btn:hover {
  cursor: pointer;
}

select {
  display: block;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
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
  padding: 0.5rem 0.45rem;

  line-height: 1rem;
}

.closebtn {
  position: relative;
  /* left: 6%; */
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

input {
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

.tableExtension > div:first-child > input {
  width: 50%;
  display: block;
  height: 49%;
  padding: 0.5rem 0.45rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.5rem;
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

.tableExtension {
  flex-basis: 50%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.tableExtension > div {
  margin-top: 1%;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.custom-select .v-input--selection-controls__input {
  height: 2px; /* Adjust the height as needed */
}

.custom-select .v-select__slot {
  line-height: 2px; /* Adjust the line height as needed */
}

.loader-overlay {
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 15, 15, 0.671);
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

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
  appearance: menulist;
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
  background: #65C2FC; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #65C2FC; /* color of the handle on hover */
}
</style>
