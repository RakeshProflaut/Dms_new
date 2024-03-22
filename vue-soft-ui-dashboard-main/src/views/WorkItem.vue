<template>
      <div class="workItemContainer">
        <div class="header">
          <div class="left">
            <div class="title">{{ id }}</div>
            <div class="item" style="color: #344767">{{ name }}</div>
          </div>
          <div class="right">
            <v-btn :ripple="false" @click="editItem(item)">Upload</v-btn>
            <v-btn :ripple="false" @click="sendUpdatedData">Save</v-btn>
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
                  src=""
                  id="iframeId"
                  height="80%"
                  width="90%"
                ></iframe>
              </div>

              <!-- Viewer for displaying Word document -->
              <iframe
                v-if="wordDocument"
                :src="wordDocument"
                style="width: 100%; height: 500px"
              ></iframe>
            </pane>
            <pane>
              <div class="dashboard1">
                <div>
                  <v-tabs :ripple="false" v-model="tab">
                    <v-tab
                      :ripple="false"
                      v-for="tabOption in fullColumnData"
                      :key="tabOption.key"
                      @click="fillFormData(tabOption.key)"
                    >
                      {{ tabOption.name }}
                    </v-tab>
                  </v-tabs>
                </div>
                <div class="tabsContent">
                  <div
                    v-for="inptData in inputBoxData"
                    :key="inptData.boName"
                    class="input-field"
                  >
                    <div v-if="inptData.type === 'document'" class="document">
                      <v-card
                        style="width: 190%; height: 480px; overflow: hidden"
                      >
                        <v-data-table
                          v-modal="selectedTabs"
                          :headers="headers"
                          fixed-header
                          :search="search"
                          :items="documents"
                          style="height: 500px; overflow-y: auto"
                        >
                          <template v-slot:[`item.action`]="{ item }">
                            <v-btn
                              class="viewBtn"
                              size="small"
                              @click="showDocument(item)"
                            >
                              View
                            </v-btn>
                          </template>
                        </v-data-table>
                        <v-dialog v-model="dialogOpen" class="dialogeBox">
                          <div class="uploadContainer">
                            <div class="uploadHeader">
                              <div>UPLOAD FILE</div>
                              <button
                                class="closebtn"
                                @click="dialogOpen = false"
                              >
                                <i class="bx bx-x"></i>
                              </button>
                            </div>
                            <div class="uploadBox">
                              <div class="uploadInput">
                                <span> Document Name *</span>
                                <input
                                  type="text"
                                  :id="inptData.boName"
                                  placeholder="Document Name"
                                  required
                                  v-model="uploadDetails.docName"
                                />
                              </div>
                              <div class="doctype">
                                <span style="font-size: 15px; font-weight: 600">
                                  Document Type *</span
                                >
                                <select
                                  v-model="uploadDetails.extension"
                                  style="min-width: 50%"
                                >
                                  <option value="null" disabled>
                                    Select document Type
                                  </option>
                                  <option
                                    v-for="document in documentsType"
                                    :key="document.value"
                                    :value="document.value"
                                  >
                                    {{ document.title }}
                                  </option>
                                </select>
                              </div>
                              <div class="fileinput">
                                <input
                                  type="file"
                                  name="myfile"
                                  id="fileUpload"
                                  @change="convertToBase64"
                                />
                              </div>
                              <div class="uploadButton">
                                <v-btn class="btn" @click="postUploadedFile">
                                  Upload
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </v-dialog>
                      </v-card>
                    </div>

                    <div v-if="inptData.type === 'text'">
                      <input
                        type="text"
                        :id="inptData.boName"
                        v-model="userData[inptData.boName]"
                        :disabled="checkEnable(inptData.edit)"
                        required
                      />
                      <label :for="inptData.boName"
                        >{{ inptData.title }}*</label
                      >
                    </div>
                    <div v-if="inptData.type === 'number'">
                      <input
                        type="text"
                        maxlength="11"
                        :id="inptData.boName"
                        :disabled="checkEnable(inptData.edit)"
                        v-model="userData[inptData.boName]"
                        required="required"
                      />
                      <label :for="inptData.boName"
                        >{{ inptData.title }}*</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </pane>
          </splitpanes>
        </div>
      </div> 
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import { PDFDocument } from "pdf-lib";
import "splitpanes/dist/splitpanes.css";
import axios from "axios";
import mammoth from "mammoth";
import EditItem from "../views/EditItem.vue";

export default {
  name: "workItem",

  created() {
    console.log(this.id);
    console.log(this.name);
  },
  mounted() {
    this.fillFormData(this.tabOptions[0].key);
    this.getDownloadedfiles();
  },
  components: {
    Splitpanes,
    Pane,
    EditItem,
  },

  props: {
    tabLabel: {
      type: Object,
      required: true,
    },
    itemValue: {
      type: Object,
    },
  },
  data() {
    return {
      editdialogeToggle: false,
      wordDocument: null,
      titleAndId: "",
      userData: {
        customerId: "",
        accountNo: "",
        name: "",
        branch: "",
        branchCode: "",
        ifsc: "",
      },
      uploadDetails: {
        image: "",
        docName: "",
        extension: null,
      },
      base64Data: null,
      docContent: "",
      tab: "option-1",
      closeStaus: "",
      documentsType: [
        {
          title: "Word",
          value: "doc",
        },
        {
          title: "PDF",
          value: "pdf",
        },
        {
          title: "Text",
          value: "txt",
        },
        {
          title: "Excel(xls)",
          value: "xls",
        },
        {
          title: "Excel(xlsx)",
          value: "xlsx",
        },
        {
          title: "JPG",
          value: "jpg",
        },
        {
          title: "JPEG",
          value: "jpeg",
        },
        {
          title: "PNG",
          value: "png",
        },
      ],
      headers: [
        {
          title: "Id",
          align: "start",
          sortable: false,
          key: "id",
        },
        {
          title: "File Name",
          key: "docName",
        },

        {
          title: "Uploaded By",
          key: "uploadedBy",
        },
        {
          title: "Uploaded Time ",
          key: "uploadedTime",
        },
        {
          title: "Action",
          key: "action",
        },
      ],
      documents: [       
      ],
      inputBoxData: [],
      dialogOpen: false,
      fullColumnData: [
        {
          name: "Customer Information",
          key: "cust_info",
          actions: ["MAKER"],
          value: [
            {
              title: "CUSTOMER ID",
              boName: "customerId",
              type: "text",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
            {
              title: "NAME",
              boName: "name",
              type: "text",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
            {
              title: "ACC NO.",
              boName: "accountNo",
              type: "number",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
            {
              title: "BRANCH",
              boName: "branch",
              type: "text",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
            {
              title: "BRANCH CODE",
              boName: "branchCode",
              type: "text",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
            {
              title: "IFSC",
              boName: "ifsc",
              type: "text",
              length: "100",
              mandatory: ["MAKER"],
              view: ["CHECKER"],
              edit: ["maker"],
              value: "",
            },
          ],
        },
        {
          name: "Document",
          key: "doc",
          actions: ["LEAD"],
          value: [
            {
              title: "PRICE IN RS.",
              boName: "document",
              type: "document",
              length: "100",
              mandatory: ["LEAD", "CONTACT"],
              view: ["SEND_EMAIL"],
              edit: ["send_quote"],
              value: "Durai",
            },
            {
              title: "Upload Document",
              boName: "Upload",
              type: "uploadButton",
              length: "100",
              mandatory: ["LEAD", "CONTACT"],
              view: ["SEND_EMAIL"],
              edit: ["send_quote"],
              value: "Durai",
            },
          ],
        },
      ],
      tabOptions: [
        {
          key: "cust_info",
          title: "Customer Information",
        },
        {
          key: "org_info",
          title: "Organisation Details",
        },
        {
          key: "opportunity",
          title: "Opportunity",
        },
        {
          key: "quote",
          title: "Quote",
        },
      ],
    };
  },
  methods: {
    closeDialogeBox(value) {
      this.editdialogeToggle = value;
    },
    async sendUpdatedData(event) {
      const updatedData = {
        ...this.userData,
        prospectId: this.itemValue.prospectId,
      };
      console.log(updatedData);
      const apiUrl = `http://localhost:61050/dms/transaction/update?prospectId=${this.itemValue.prospectId}`;
      const token = this.$store.getters.getUserToken;
      await axios
        .put(apiUrl, updatedData, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log(response.data.status);
          if (Object.values(updatedData).every((value) => value !== "")) {
            this.$emit("update-data-table", updatedData);
            this.$emit("listnerDialog", false);
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
              onBeforeOpen: (toast) => {
                toast.style.zIndex = 10000;
              },
            });
            Toast.fire({
              icon: "error",
              title: "Please Fill all the Fields!",
            });
          }
        })
        .catch((error) => console.log("error occured by", error));
    },

    async convertToBase64(event) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Data = reader.result;
        this.uploadDetails.image = this.base64Data.split(",")[1];
      };
    },
    async postUploadedFile() {
      this.getDownloadedfiles();

      console.log("propectid", this.itemValue.prospectId);
      const apiUrl = "http://localhost:61050/dms/file/upload";
      const token = this.$store.getters.getUserToken;
      const upldData = {
        ...this.uploadDetails,
        prospectId: this.itemValue.prospectId,
      };
      console.log("uploaddetails", upldData);
      await axios
        .post(apiUrl, upldData, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          console.log("response", response.data.status);
          if (response.data.status) {
            this.getDownloadedfiles();
            this.dialogOpen=false;
          }
        })
        .catch((error) => console.log("error occured by", error));
    },
    async showDocument(item) {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(`http://localhost:61050/dms/file/downloadBy?id=${item.id}`, {
          headers: {
            token: this.$store.getters.getUserToken,
          },
        })
        .then((response) => (this.docContent = response.data.image))
        .catch((error) => console.error("Error occured by", error));

      if (this.docValue != "") {
        console.log("dOCUmENT", this.docContent);
        document.getElementById("iframeId").style.display = "block";
        document.getElementById("iframeId").src =
          "data:application/pdf;base64," + this.docContent;
      } else {
        document.getElementById("iframeId").style.display = "none";
      }
    },
    fillFormData(key) {
      this.fullColumnData.forEach((item) => {
        if (item.key == key) {
          this.inputBoxData = item.value;
        }
      });
    },

    productDialogClose() {
      this.$emit("listnerDialog", false);
    },
    checkTabAccess() {
      return true;
    },
    checkEnable(value) {
      //  this.setUpdatedData(inputData);
      //   const result = value.find((element) => element === this.tabLabel.key);
      //   const finalResult = !result;
      //   return finalResult;
    },

    async getDownloadedfiles() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await axios
        .get(
          `http://localhost:61050/dms/file/download?prospectId=${this.itemValue.prospectId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then(
          (response) => (
            (this.documents = response.data.document),
            (this.docId = response.data.document)
          )
        )
        .catch((error) => console.error("Error occured by", error));
    },

    editItem(item) {
      this.dialogOpen = true;
      this.currentItem = item;
    },
    async convertPdfAndModify() {
      if (this.docContent !== "") {
        // Decode the base64-encoded PDF content
        const decodedPdf = atob(this.uploadDetails.image);

        // Convert the PDF content to HTML using mammoth.js
        const htmlResult = await mammoth.extractRawText({
          arrayBuffer: decodedPdf,
        });
        const htmlContent = htmlResult.value;

        // Convert HTML to Word
        const wordBlob = await this.convertHtmlToWord(htmlContent);

        // Modify the Word document if needed
        const modifiedWordBlob = await this.modifyWordDocument(wordBlob);

        // Convert the modified Word Blob to a data URL
        const modifiedWordDataUrl = URL.createObjectURL(modifiedWordBlob);

        // Set the modified Word document URL for the viewer
        this.wordDocument = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(modifiedWordDataUrl)}`;
      } else {
      }
    },

    async convertHtmlToWord(htmlContent) {
      const result = await mammoth.extractRawText({ arrayBuffer: htmlContent });
      return new Blob([result.value], { type: "application/msword" });
    },

    async modifyWordDocument(wordBlob) {
      // Example modification: Append text to the Word document
      const wordText = await this.readBlobAsText(wordBlob);
      const modifiedWordText = wordText + "\nModified content";

      // Convert modified text back to Blob
      return new Blob([modifiedWordText], { type: "application/msword" });
    },

    async readBlobAsText(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(blob);
      });
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

.input-field {
  position: relative;
  width: 250px;
  height: 44px;
  line-height: 44px;
}
label {
  position: absolute;
  left: 0;
  width: 80%;
  font-size: 15px;
  top: -30px;
  color: #000;
  transition: 0.2s all;
  font-weight: 600;

  cursor: text;
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
input:invalid {
  outline: 0;
}
input ~ label {
  color: #344767;
}
input:focus ~ label,
input:valid ~ label {
  position: absolute;
  top: -34px;
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
select:focus ~ label,
select:valid ~ label {
  font-size: 13px;
  position: absolute;
  top: -20px;
  color: #000;
}

textarea {
  width: 80%;
  margin-top: 8px;
  height: 30px;
  font-weight: 600;
  border: 0;
  outline: 0;
  border-bottom: 2px solid #d3d3d3;
  box-shadow: none;
  color: #111;
}
textarea:invalid {
  outline: 0;
}
textarea:focus,
textarea:valid {
  border-color: #000;
}
textarea:focus ~ label,
textarea:valid ~ label {
  font-size: 13px;
  top: -20px;
  color: #000;
  font-weight: 600;
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

.uploadInput > input {
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
.fileinput > input {
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
  margin-top: 3%;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}
.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.uploadButton {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
input[type="file"]::file-selector-button {
  padding: 0.2em 0.4em;
  margin-top: 2%;
  height: 25px;
  color: #fff;
  border-radius: 0.2em;
  border: none;
  background: #344767;
  transition: 1s;
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
</style>
