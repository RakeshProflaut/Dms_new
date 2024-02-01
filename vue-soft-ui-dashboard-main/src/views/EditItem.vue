<template>
    <div>

        <div>
            <v-btn :ripple="false" @click="productDialogClose">Close</v-btn>
        </div>
        <div>
            <ejs-richtexteditor  :height="400">
                <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.Users can format their content using standard toolbar commands.</p>
            </ejs-richtexteditor>
        </div>
    </div>
          
  
</template>

<script>
import { RichTextEditorComponent,Toolbar, Link, Image, Count, HtmlEditor,Table  } from '@syncfusion/ej2-vue-richtexteditor';

export default {
name:'editItem',
provide:{
    richtexteditor:[Toolbar,Link,Image,Count,HtmlEditor,Table]

},
components:{
    'ejs-richtexteditor':RichTextEditorComponent,    
},
methods:{
    productDialogClose() {
      this.$emit("closeDialogeBox", false);
    },
}
}

</script>

<style>
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-base\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-inputs\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-lists\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-popups\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-buttons\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-navigations\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-splitbuttons\styles\bootstrap5.css";
@import "C:\Users\BILLPC02\Desktop\DMS_new\vue-soft-ui-dashboard-main\node_modules\@syncfusion\ej2-vue-richtexteditor\styles\bootstrap5.css";

</style>