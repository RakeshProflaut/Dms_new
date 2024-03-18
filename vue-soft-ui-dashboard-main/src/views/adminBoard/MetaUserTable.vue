<template>
  <div style="display: flex; flex-direction: column">
    <div class="pt-1 text-center card-header">       
        <h5>Metadata Information</h5>
      </div>   
    <div class="card-body px-0 pt-0 pb-2">
        <div style="display: flex;width: 100%;justify-content: space-between;">    
      <div class="tableExtension">
        <div  >
            <label for="name">Name</label>
            <input
            type="text"
            id="name"
            v-model="tableName"
            placeholder="Name"            
            />
        </div>
        <div style="margin-right: 5%;">
            <label>File Extensions</label>
            <textarea
            style="width: 54%;font-size: 10px;"
            v-model="selectedItems"
            placeholder="Extensions"
            class="extensionField"
            >
            </textarea>
    </div>
    </div>   
</div>

      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead class="table-header">
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
              <td v-for="header in headers" :key="header.key" style="text-align: center !important;">
                {{ item[header.key] }}           
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
name:'metUserTable',
mounted(){
  this.getTableData()
  console.log("nameee",this.selectedTableId);
},
computed:{
  filteredFieldNames() {
      return this.fieldNames.filter(header => header !== 'id' && header !== 'doc_id');
    }

},
data(){
  return{
    selectedTabs: null,
      selectedItems:[],
      tableName:"",
      search: "",
      showLoader:false,    
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
          text: "Word",
          value: "doc",
        },
        {
            text: "PDF",
          value: "pdf",
        },
        {
            text: "Text",
          value: "txt",
        },
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
      ]
    };
  },
props: {
  selectedTableId:{
      type: String,
      required: true,
    },
  },
methods:{
  dialogeBoxtoggle() {
      this.$emit("dialogeBox", false);
    },

    async getTableData() {
      console.log("dms token", this.$store.getters.getUserToken);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/meta/getAllTables?id=${this.selectedTableId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }        
        )
        .then((response) => {
          console.log( "resssponse",response.data);
          this.fields=response.data.fieldNames,
          this.tableName=response.data.tableName,
          this.selectedItems=response.data.fileExtention
          })
        .catch((error) => console.error("Error occured by", error));
    },

},
}
</script>

<style scoped>

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


.tableExtension >div:first-child >input{
    width: 50%;
    display: block;
    height: 49%;
  padding: 0.5rem 0.45rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: .5rem;
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


.tableExtension{
    flex-basis: 50%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.tableExtension >div{
    margin-top: 1%;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;

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

.extensionField{
  width: 49%;
  padding: 0.5rem 0.45rem;
  font-size:15px !important;
  font-weight: 400;
  text-align: left;
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

.card-body {
  height: 100%;
}

.table-responsive{
  height: 200px;
  position: relative;
  overflow-x: auto;

}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
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