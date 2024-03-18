  <template>
    <div id="webviewer" ref="viewer"></div>
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
  </template>

  <script>
  import { ref, onMounted } from "vue";
  import { useStore } from 'vuex'; // Import the useStore function
  import WebViewer from "@pdftron/webviewer";
  import axios from 'axios';


  export default {
    name: "WebViewer",
    props: { initialDoc: String,
      fileDetails:String } ,     
  setup(props,context) {
      const viewer = ref(null);
      let webInstance = null;
      const store = useStore();
      const folderDetails = store.getters.getFolderDetails; 
      
      onMounted(() => {
        const path = `${process.env.BASE_URL}webviewer`;
        WebViewer({ 
          path, 
          enableOfficeEditing:true,
          enableFilePicker:true,
          initialDoc: props.initialDoc, 
          licenseKey: 'demo:1709638961050:7f255e8c03000000003f037e7ea52f75245cf1967d95fa3948ed0d4065'  // sign up to get a free trial key at https://dev.apryse.com
        }, viewer.value).then(
          (instance) => {  
            webInstance=instance;
            const { UI, Core } = instance;    
            const { documentViewer, annotationManager, Annotations } =Core;           
            UI.enableFeatures([UI.Feature.ContentEdit]);
            UI.setToolbarGroup(UI.ToolbarGroup.EDIT_TEXT);                 

            documentViewer.addEventListener("documentLoaded", () => {
              const rectangleAnnot = new Annotations.RectangleAnnotation({
                PageNumber: 1,
                // values are in page coordinates with (0, 0) in the top left
                X: 100,
                Y: 150,
                Width: 200,
                Height: 50,
                Author: annotationManager.getCurrentUser(),
              });
              annotationManager.addAnnotation(rectangleAnnot);
              annotationManager.redrawAnnotation(rectangleAnnot);
            });
          })
      });

      const sendDocumentToBackend = async () => {
    if (webInstance) {
      const { documentViewer, annotationManager } = webInstance.Core;

      // Save the annotations as XFDF string
      const xfdfString = await annotationManager.exportAnnotations({
        widgets: false,
        links: false,
        //fields: false
      });
      console.log("XFDF String:", xfdfString);



      // Get the document and its file data
      const doc = documentViewer.getDocument();
      const data = await doc.getFileData({
        xfdfString, // Include annotations in the document
      });

      // Convert data to Blob
      const blob = new Blob([data], { type: "application/octet-stream" });
      
      // Convert Blob to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Extract base64 string
        const {image,metaDetails}=props.fileDetails;

        const updatedDetails={
    folderId: folderDetails.folderID,
    docName:image.docName,
    extention: image.extention,
    image:base64String,
    metadata: [
        {
            metadataId:folderDetails.metaId,
            fileExtension:image.extention,
            tableName:metaDetails.tableName,
            fields:metaDetails.fieldNames ,
        }
    ]
};

       const apiUrl = "http://localhost:61050/dms/file/upload";
        const token =store.getters.getUserToken;
        console.log("props.fileDetails",props.fileDetails);
         axios
        .post(apiUrl,updatedDetails,{
          headers: {
            token: token,
          },
        })
        .then((response) =>{
          console.log("response",response.data.status);
          setTimeout(() => {
            context.emit("closeDocView");
          },1500);
        })
        .catch((error) => console.log("error",error));     
      };
      reader.readAsDataURL(blob);
    } else {
      console.log("WebViewer instance not initialized.");
    }
  };

      return {
        viewer,
        sendDocumentToBackend,
      };
    },

   
  };
  </script>

  <style>
  #webviewer {
    height: 100%;
    width: 100%;
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
