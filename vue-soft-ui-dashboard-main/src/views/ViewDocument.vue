<template>
    <div class="workItemContainer">
      <div class="header">
        <div class="left">
          <div class="title">{{ id }}</div>
          <div class="item" style="color: #344767">{{ name }}</div>
        </div>
        <div class="right">
          <!-- <v-btn :ripple="false" @click="editItem(item)">Upload</v-btn>
          <v-btn :ripple="false" @click="sendUpdatedData">Save</v-btn> -->
          <v-btn :ripple="false">Submit</v-btn>
          <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
        </div>
      </div>
      <div class="body">
        <splitpanes class="default-theme" vertical>
          <pane class="fileBlock">
            <div class="fileEditbtn" >
              <v-btn @click="editdialogeToggle = true">Edit</v-btn>
              <v-dialog v-model="editdialogeToggle">
                <v-card>
                  <edit-item v-on:closeDialogeBox="closeDialogeBox" />
                </v-card>
              </v-dialog>
            </div>
                <div style="flex-basis: 95%">
                <iframe
                    style="
                    display: none;
                    width: 153%;
                    margin-left: 8%;
                    height: 93%;
                    "
                    class="embed-responsive-item"
                    :src="imageSrc"
                    id="iframeId"
                    height="80%"
                    width="90%"
                ></iframe>
                </div>      
          </pane>
          <pane>
            <div class="card-body px-0 pt-0 pb-2">
        <div style="display: flex;width: 95%;justify-content: space-between;margin: 0 auto;">    
      <div class="tableExtension">
        <div>
            <label for="name">Name</label>
            <input
            type="text"
            id="name"
            v-model="metaDetails.tableName"
            placeholder="Name"            
            />
        </div>
        <div style="margin-right: 5%;">
            <label>File Extensions</label>
            <textarea
            style="width: 54%;font-size: 10px;"
            v-model="metaDetails.fileExtention"
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
            <tr v-for="(item, rowIndex) in metaDetails.fieldNames" :key="rowIndex">
              <td v-for="header in headers" :key="header.key" style="text-align: center !important;">
                {{ item[header.key] }}           
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
          </pane>
        </splitpanes>
      </div>
    </div> 
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import axios from "axios";

export default {
name: "viewDocument",


mounted() {
  this.showDocument();
},
components: {
  Splitpanes,
  Pane,
},

props: {
    selectedDocId: {
    type: String,
    required: true,
  },

},
data() {
  return {
    base64Data: null,
    docContent: "",
    imageDetails:'',
    metaDetails:'',
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
        {
          key: "value",
          title: "VALUE",
        },
      ],
  };
},
computed: {
    imageSrc() {
      return this.imageDetails.image ? `data:image/png;base64,${this.imageDetails.image}` : '';
    }
  },
methods: {
  closeDialogeBox(value) {
    this.editdialogeToggle = value;
  },
  async showDocument() {
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    await axios
      .get(`http://localhost:61050/dms/file/downloadBy?id=${this.selectedDocId}`, {
        headers: {
          token: this.$store.getters.getUserToken,
        },
      })
      .then((response) => {
        this.imageDetails=response.data.image;
        this.metaDetails=response.data.metaDetails;
        console.log(this.metaDetails);
       } )
      .catch((error) => console.error("Error occured by", error));

      if (this.imageDetails.image !== "") {
          document.getElementById("iframeId").style.display = "block";
        } else {
          document.getElementById("iframeId").style.display = "none";
        }

    // if (this.imageDetails.image != "") {
    //   console.log("dOCUmENT", this.imageDetails.image);
    //   document.getElementById("iframeId").style.display = "block";
    //   document.getElementById("iframeId").src =
    //     "data:application/pdf;base64," + this.imageDetails.image;
    // } else {
    //   document.getElementById("iframeId").style.display = "none";
    // }
  },

  productDialogClose() {
    this.$emit("closeDocViewBox", false);
  },




},
};
</script>

<style scoped>
.min-height-300 {
min-height: 101px !important;
}
.workItemContainer {
display: flex;
/* margin-top: 2rem; */
/* margin-left: 16px !important; */
width: 100%;
height: 100vh;
flex-direction: column;
border-radius: 1rem;
border: 0.5px solid #fff;
background: #fff;
box-shadow:
  inset 0 0px 1px 1px rgba(254, 254, 254, 0.9),
  0 20px 27px 0 rgba(0, 0, 0, 0.05) !important;
}

.header {
flex-basis: 10%;
display: flex;
justify-content: space-around;
align-items: center;
display: flex;
font-weight: 600;
/* border-bottom: 1px solid; */
color: black;
padding-left: 2%;
}

.left {
flex-basis: 50%;
display: flex;
}
.right {
flex-basis: 50%;
display: flex;
justify-content: flex-end;
padding-right: 5%;
}
.right > .v-btn {
margin-left: 2%;
color: #fff;
font-weight: bold;
background: #87e42e;
transition: 0.5s ease;
box-shadow:
  0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
  0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.right > .v-btn:hover {
cursor: pointer;
color: #344767;
background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}

.viewBtn {
margin-left: 2%;
color: #fff;
font-weight: bold;
background: #87e42e;
transition: 0.5s ease;
box-shadow:
  0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
  0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.viewBtn:hover {
cursor: pointer;
color: #344767;
background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}
.document > button {
/* padding: 8px;
 margin-left: 200%;
 */
position: relative;
/* left: 500px; */
background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
width: 30%;
height: 36px;
border-radius: 8px;
border: none;
color: white;
box-shadow:
  0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
  0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
  0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.title {
font-size: 18px;
margin-right: 5%;
color: #344767;
}

.item {
font-size: 18px;
}
.mdi-chevron-right:before {
color: red;
}

.body {
flex-basis: 90%;
width: 100%;
height: 100%;
}

.dashboard1 {
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
height: 100%;
}

.tabsContent {
flex-basis: 90%;
padding: 5% 0 0 3%;
display: grid;
/* grid-template-columns: 25% 25% 25% 25%; */
/* grid-template-rows: 20% 20%; */
color: black;
width: 100%;
height: 100%;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}



input {
display: block;
width: 85%;
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

.v-slide-group__next {
background: blue;
}
select {
width: 80%;
height: 50%;
border: 0;
font-weight: 600;

outline: 0;
padding: 0.3rem 0;
border-bottom: 2px solid #d3d3d3;
box-shadow: none;
color: #111;
}
select:invalid {
outline: 0;
}
select:focus,
select:valid {
border-color: #000;
}

.uploadContainer {
display: flex;
flex-direction: column;
width: 410px;
height: 285px;
background: #fff;
border-radius: 10px;
box-shadow:
  0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
  0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
  0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.uploadBox {
flex-basis: 90%;
padding-left: 3%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
background: #f8f9fa;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
}
.uploadHeader {
flex-basis: 10%;
margin-top: 2%;
display: flex;
justify-content: space-between;
align-items: center;
}
.uploadHeader > div:first-child {
font-size: 20px;
color: #344767;
font-weight: 600;
margin-left: 3%;
}


.doctype {
display: flex;
margin-top: 2%;
flex-direction: column;
}
.doctype > select {
height: 65%;
width: 50%;
border: 1;
outline: 0;
font-weight: 600;
color: #111;
}
.uploadInput > span {
font-size: 15px;
font-weight: 600;
}
.uploadInput {
margin-top: 2%;
display: flex;
flex-direction: column;
width: 50%;
}

.upload-btn-wrapper {
position: relative;
overflow: hidden;
display: inline-block;
}

.btn {
margin-right: 3%;
color: #fff;
font-weight: bold;
background: #87e42e;
transition: 0.5s ease;
box-shadow:
  0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
  0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.btn:hover {
cursor: pointer;
color: #344767;
background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}


.uploadButton {
display: flex;
justify-content: flex-end;
width: 100%;
}

.dialogeBox {
padding-left: 50%;
/* width:200px;
height: 150px; */
}

.closebtn[data-v-6208d5fe] {
position: relative;
top: -11px;
left: 0.2px;
/* width: 22px; */
/* height: 22px; */
/* display: flex; */
/* justify-content: center; */
/* align-items: center; */
color: #d11313;
font-size: 30px;
opacity: 0.3;
/* border-radius: 50%; */
/* border: none; */
/* background: rgb(238, 52, 52); */
margin-bottom: 1%;
}

.closebtn:hover {
opacity: 1;
}

.splitpanes__pane {
justify-content: center;
align-items: center;
display: flex;
border-bottom-left-radius: 1rem;
border-bottom-right-radius: 1rem;
transition:
  background-color 0.3s ease,
  transform 0.3s ease; /* Added transition */
}

.fileBlock {
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
}

.fileEditbtn {
flex-basis: 10%;
display: flex;
justify-content: flex-end;
align-items: center;
padding-right: 3%;
width: 100%;
height: 100%;
}

.fileEditbtn > .v-btn {
color: #fff;
font-weight: bold;
background: #87e42e;
transition: 0.5s ease;
box-shadow:
  0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12),
  0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.fileEditbtn > .v-btn:hover {
cursor: pointer;
color: #344767;
background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}

.v-blur {
z-index: 1;
filter: blur(5px); /* Adjust the blur value as needed */
transition: filter 0.3s ease;
}


input {
  display: block;
  width: 50%;
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





.tableExtension{
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-top: 5%;
}

.tableExtension >div{
    margin-top: 1%;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;


}


.extensionField{
  width: 100%;
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
  background: #f2f2f2;
}


</style>
