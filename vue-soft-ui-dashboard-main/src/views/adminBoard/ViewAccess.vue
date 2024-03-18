<template>
  <div style="display: flex; flex-direction: column">   
    <div class="pt-1 text-center card-header">
      <h5>{{ metaDataName }}</h5>
    </div>

    <div class="card-body px-0 pt-0 pb-2">
      <div class="form">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="tableName" placeholder="Name"  disabled   />
        </div>
        <div>
          <label>View</label>
              <template v-if="viewAccess === 'Yes'">
              <soft-badge color="success" variant="gradient"    style=" 
                              color:#596195;                     
                      background: rgb(228,243,227);
background: linear-gradient(270deg, rgba(228,243,227,1) 0%, rgba(88,189,255,1) 95%);"  size="sm">Enable</soft-badge>
          </template>
          <template v-else>
              <soft-badge color="secondary" variant="gradient" size="sm">Disable</soft-badge>
          </template>
        </div>
        <div>
          <label>Write</label>
          <template v-if="writeAccess === 'Yes'">
              <soft-badge color="success" variant="gradient"    style=" 
                              color:#596195;                     
                      background: rgb(228,243,227);
background: linear-gradient(270deg, rgba(228,243,227,1) 0%, rgba(88,189,255,1) 95%);"  size="sm">Enable</soft-badge>
          </template>
          <template v-else>
              <soft-badge color="secondary" variant="gradient" size="sm">Disable</soft-badge>
          </template>
        </div>
    </div>

          <div class="tablecontainer">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead class="table-header">
                  <tr>
                    <th
                    v-for="(header) in  userHeaders"
                    :key="header.key"
                    class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
                    >
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
    <tr v-for="(data, rowIndex) in users " :key="rowIndex">
      <td v-for="(header, index) in userHeaders" :key="index" style="text-align: center;">        
        <div 
                  style="text-align: center;"  
                  :class="{  'font-weight-bolder':
                    header.key === 'userName',}"
                  class=" text-center d-flex flex-column justify-content-center">
                  {{ data[header.key] }}
                </div>
              </td>    
            </tr>
          </tbody> 
        </table>
      </div>
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead class="table-header">
            <tr>
              <th
              v-for="(header) in  groupHeaders"
              :key="header.key"
              class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-10"
              >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(data, rowIndex) in groups " :key="rowIndex">
            <td v-for="(header, index) in groupHeaders" :key="index" style="text-align: center;">        
              <div 
              style="text-align: center;"  
              :class="{  'font-weight-bolder':
                    header.key === 'groupName',}"
                  class=" text-center d-flex flex-column justify-content-center">
                  {{ data[header.key] }}
                </div>
              </td>    
            </tr>
          </tbody>
          </table>
        </div>
      </div>
     
      </div>
    </div>
</template>

<script>
import axios from "axios";
import SoftBadge from "@/components/SoftBadge.vue";

export default {
  name: "viewAccess",
  components: {
    SoftBadge,
  },
  mounted() {
    this.getTableData();
    console.log("nameee", this.selectedAccessId);
  },
  computed: {
    filteredFieldNames() {
      return this.fieldNames.filter(
        (header) => header !== "id" && header !== "doc_id"
      );
    },
  },
  data() {
    return {
      selectedTabs: null,
      selectedItems: [],
      metaDataName:'',
      tableName: "",
      groups:[],
      users:[],
      viewAccess:'',
      writeAccess:'',
      showLoader: false,
      userHeaders:[
        {
          key:'userName',
          title:' USER NAME'
        }
      ],
      groupHeaders:[

        {
          key:'groupName',
          title:'GROUP NAME'
        }
      
      ]
    };
  },
  props: {
    selectedAccessId: {
      type: String,
      required: true,
    },
  },
  methods: {
    dialogeBoxtoggle() {
      this.$emit("dialogeBox", false);
    },

    async getTableData() {
      console.log("dms token", this.$store.getters.getUserToken);
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/access/getAccessById?id=${this.selectedAccessId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("resssponse", response.data);
          console.log("metaDataname",response.data.tableName);
          console.log("userssss",response.data.user);

            this.users= response.data.user;
            this.groups = response.data.group;
            this.viewAccess =response.data.view;
            this.writeAccess=response.data.write;
            this.tableName=response.data.table;
            this.metaDataName=response.data.tablename;

        })
        .catch((error) => console.error("Error occured by", error));
    },
  },
};
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
  width: 55%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
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

.tablecontainer{
  display: flex; 
  margin-top: 4%;
  width: 100%;  
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  line-height: 1.4rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.5rem;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.tablecontainer >div{
  border-radius: 0.5rem;
  flex-basis: 45%;
}


.extensionField {
    width: 65%;
  padding: 0.5rem 0.45rem;
  font-size: 15px !important;
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

.table-responsive{
  height:250px;
  width: 100%;
  position: relative;
  overflow-y: auto;

}

.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form > div {
  margin-top: 4%;
  width: 100%;
  display: flex;
}

.form > div >label{
    flex-basis: 20%;
    font-size: 13px;
    display: flex;
    align-items: center 
    
}

.card-body {
  height: 100%;
  width: 80%;
  margin: 0 auto;
}

/* Width */
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
  background: #9cccca; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}

</style>
