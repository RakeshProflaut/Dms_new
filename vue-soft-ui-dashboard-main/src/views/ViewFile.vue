<template>
  <div class="folderContainer"> 
    <div class="pt-2 text-center card-header text-uppercase">
      <!-- <h5>{{ this.selectedfolder.folderName }} Folder</h5> -->
    </div>
    <div   class="newButton">
        <!-- <span  class="mdi mdi-file-download"></span> -->
        <span :class="['mdi',this.extensionIcon]"></span>
        <span @click="sendDocId" style="margin-left: 3%;" class="mdi mdi-download-circle"></span>
        <span class="mdi mdi-information-box"
         style="margin-left: 3%"
          @click="docViewBox =true">
        </span>
        <!-- <span class="mdi mdi-file-jpg-box"></span> -->
        <!-- <span class="mdi mdi-file-pdf-box"></span> -->
        <!-- <span class="mdi mdi-file-excel"></span> -->
            </div>
    <div class="card-body">
      <div>
          <label>File Name *</label>
          <input
            type="text"
            style="width: 70%"
            v-model="imageDetails.docName"
            placeholder="Document Name"
            required
            :readonly="showFirstPane"
          />
        </div>
        <div>
          <label>Name *</label>
          <input
            type="text"
            style="width: 70%"
            v-model="metaDetails.tableName"
            placeholder="Document Name"
            required
            :readonly="showFirstPane"
          />
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
                        style="width: 100%"
                        :required="true"
                        readonly
                        class="extensionField"
                      />
                  </div>
        </div> 
        <v-dialog v-model="docViewBox"  style=" z-index: 1001">
        <v-card style="width: 100%;margin: 0 auto; border-radius:1.5rem">
          <view-document-vue
          :selectedDocId="selectedDocId"
          v-on:closeDocView="closeDocView"
          />
        </v-card>
      </v-dialog>      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ViewDocumentVue from './ViewDocument.vue';
export default {
name:'viewFile',
components:{
  ViewDocumentVue,
},

mounted() {
    this.showDocument();   
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
      imageDetails: "",
      metaDetails: "",
      extensionIcon:'',
      fieldNames: [],
      docViewBox:false,
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
  
  methods: {
    closeDialogeBox(value) {
      this.editdialogeToggle = value;
    },
    async showDocument() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/file/downloadBy?id=${this.selectedDocId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          this.imageDetails = response.data.image;
          this.metaDetails = response.data.metaDetails;
          this.fieldNames = this.metaDetails.fieldNames;
          console.log("fieldsss", response.data);        
        })
        .catch((error) => console.error("Error occured by", error));
        console.log("extension",this.imageDetails.extention);
        this.getExtensionIcon();
     
    },

    productDialogClose() {
      this.$emit("closeDocViewBox", false);
    },

    getExtensionIcon() {
        console.log("getIcon",this.imageDetails.extention);
    if (this.imageDetails.extention === "jpg" || this.imageDetails.extention === "jpeg") {
        this.extensionIcon = 'mdi-file-jpg-box';
    } else if (this.imageDetails.extention === "xls" || this.imageDetails.extention === "xlsx") {
        this.extensionIcon = 'mdi-file-excel';
    } else if (this.imageDetails.extention === "pdf") {
        this.extensionIcon = 'mdi-file-pdf-box';
    }
    else if (this.imageDetails.extention == "docx") {
        this.extensionIcon = 'mdi-file-word-box';
    }
    else {
        this.extensionIcon = 'mdi-file-png-box';
    }
},

closeDocView(value) {
      this.docViewBox = value;
      this.showDocument();
    },



async downloadFile(event) {
    console.log("dowlpadfile extenion",this.imageDetails.extention);
    console.log("dowlpadfile name",this.imageDetails);
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";   

    try { 

        let fileType;
        let fileName;

        // Determine the file type and filename based on the file extension
        if (this.imageDetails.extention ==='pdf') {
            fileType = 'application/pdf';
            fileName = `${this.imageDetails.docName}.pdf`;
        } else if (this.imageDetails.extention === 'jpg' || this.imageDetails.extention === 'jpeg') {
            fileType = 'image/jpeg';
            fileName = `${this.imageDetails.docName}.jpg`;
        } else if (this.imageDetails.extention === 'xlsx') {
            fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            fileName = `${this.imageDetails.docName}.xlsx`;
        } else if (this.imageDetails.extention === 'xls') {
            fileType = 'application/vnd.ms-excel';
            fileName = `${this.imageDetails.docName}.xls`;;
        }  else if (this.imageDetails.extention == 'docx') {
          fileType = 'application/msword'; 
            fileName = `${this.imageDetails.docName}.docx`;
        } else {
            throw new Error('Unsupported file type');
        }


        // Construct a data URL with the base64-encoded file data
        const linkSource = `data:${fileType};base64,${this.imageDetails.image}`;

        // Create a new <a> element to act as a download link
        const downloadLink = document.createElement("a");

        // Set the href attribute of the download link to the data URL
        downloadLink.href = linkSource;

        // Set the download attribute to specify the filename for the downloaded file
        downloadLink.download = fileName;

        // Programmatically click the download link to initiate the download
        downloadLink.click();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
    


   
},

async sendDocId(event){  
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  // event.preventDefault();
      await axios
        .post(
          `http://localhost:61050/dms/file/downloadHistory/${this.selectedDocId}`,
          {},
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then((response) => {
          console.log("dowload status", response.data.status);
          this.downloadFile(event)        
        })
        .catch((error) => console.error("Error occured by", error));
     

},
getFieldType(fieldType) {
      return fieldType === "integer"? "number"
        : fieldType === "date"
          ? "datetime-local"
          : "text";
    },

  },
};
</script>

<style scoped>
.card-body{
    width: 100%;
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
  background-image:linear-gradient(
    310deg,
    #82d616,
    #5CC06E
  ) !important;
  margin-top: 16px !important;
  border-radius: 1rem;
  padding: 8px 0px;
  box-shadow:
    0 4px 7px -1px rgba(0, 0, 0, 0.11),
    0 2px 4px -1px rgba(0, 0, 0, 0.07);
}

.folderContainer {
  height: 100%;
  width: 90%;
  margin: 0 auto;
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

/* .textFields {
  display: flex;
  flex-wrap: wrap;
  column-gap: 5%;
  overflow: auto;
  width: 100%;
  height: 200px;
} */

.textFields {
  display: flex;
  column-gap: 5%;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
  height: 200px; /* Adjust height as needed */
}

.textFields > div {
  flex-basis: 38%; /* Adjust the width of each field */
  margin-bottom: 10px; /* Adjust spacing between fields */
}

/* Adjust styles for labels and inputs as needed */


.newButton {
  display: flex;
  justify-content: flex-end;
  margin: 1% 0px;
  margin-right: 2%;

}
.newButton > span {
    display: flex !important;
    border-radius: 4px;
    font-size: 25px;
    display: flex;
    border-style: solid;
    border-width: 0;
    background: #5CC06E;
    transition: 0.5s ease;
    color: #fff;
    height: 30px;
    align-items: center;
    justify-content: center;
    width: 8%;
}
.newButton > span:hover {
  cursor: pointer;
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
  background: #5CC06E; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d2d6da; /* color of the handle on hover */
}

</style>