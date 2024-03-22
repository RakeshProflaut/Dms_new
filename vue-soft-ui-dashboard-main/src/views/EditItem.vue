<template>
    <div style="" class="editContainer">

        <div class="close">
            <v-btn :ripple="false" @click="productDialogClose">Save</v-btn>
            <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
        </div>
        <div>
            <!-- <ejs-richtexteditor
            @created="handleEditorCreated"
            :height="400" :toolbarSettings="toolbarSettings" :floating-toolbar-offset="15" :quickToolbarSettings="quickToolbarSettings
            "
            
            >
                <h1>Word Document Viewer</h1>
  <iframe id="wordViewer" style="width: 100%; height: 600px;"></iframe>
            </ejs-richtexteditor> -->
        </div>
    </div>
          
  
</template>

<script>
// import mammoth from 'mammoth';
// import { RichTextEditorComponent,Toolbar, Link, Image, Count, HtmlEditor,Table,QuickToolbar  } from '@syncfusion/ej2-vue-richtexteditor';

export default {
name:'editItem',
data(){
    return{
        // toolbarSettings:{
        //     items:['Bold','Italic','Undo','Redo','CreateTable','Image','CreateLink','Underline','StrikeThrough','FontName','FontSize',
        //             'FontColor','BackgroundColor','LowerCase','UpperCase','|','Formats','Alignments','OrderedList','UnorderedList',
        //             'Outdent','Indent','|','CreateLink','|','ClearFormat','Print','SourceCode','FullScreen','|',
        //             {
        //             tooltipText: 'Rotate Left',
        //             template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
        //         },
        //         {
        //             tooltipText: 'Rotate Right',
        //             template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
        //         }
      
        //         ],
        // quickToolbarSettings:{
        //     image:[
        //             'Replace','Align','Caption','Remove','InsertLink','OpenImageLink','-','EditImageLink',
        //             'RemoveImageLink','Display','AltText','Dimension'
        //     ]
        // },
        // },
       
        base64Data:""
    }
},
mounted(){
//    this.displayWordDocument(this.base64Data) 
},
// provide:{
//     richtexteditor:[Toolbar,Link,Image,Count,HtmlEditor,Table,QuickToolbar]

// },
// components:{
//     'ejs-richtexteditor':RichTextEditorComponent,    
// },
methods:{
  
//     async displayWordDocument(base64Data) {
//     try {
//       // Decode Base64 and convert to ArrayBuffer
//       const binaryData = atob(base64Data);
//       const arrayBuffer = new Uint8Array(new ArrayBuffer(binaryData.length));
//       for (let i = 0; i < binaryData.length; i++) {
//         arrayBuffer[i] = binaryData.charCodeAt(i);
//       }

//       // Convert Word document to HTML using mammoth.js
//       const result = await mammoth.extractRawText({ arrayBuffer });

//       // Set the HTML content
//       const wordViewer = this.$refs.wordViewer;
//       if (wordViewer) {
//         wordViewer.srcdoc = result.value;
//       }
//     } catch (error) {
//       console.error('Error converting Word document:', error);
//     }
//   },
  // ...
  
  productDialogClose() {
      this.$emit("closeDialogeBox", false);
    },
  
}
}


</script>

<style>
/* @import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-base\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-inputs\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-lists\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-popups\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-buttons\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-navigations\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-splitbuttons\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-vue-richtexteditor\styles\bootstrap5.css"; */


.close{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: .5% 0;
 
}

.close >.v-btn{
  color: #fff;
  margin-right: 2%;
  font-weight: bold;
  background: #87E42E;
  transition: .5s ease;
  box-shadow: 0 0.25rem 0.375rem -0.0625rem rgba(20, 20, 20, 0.12), 0 0.125rem 0.25rem -0.0625rem rgba(20, 20, 20, 0.07) !important;
}

.close >.v-btn:hover{
  cursor: pointer;
    color:#344767;
    background-image: linear-gradient(270deg, #17ad37 0%, #98ec2d 100%);
}

.editContainer{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative; /* or absolute */
  z-index: 1;
}




</style>


  

  