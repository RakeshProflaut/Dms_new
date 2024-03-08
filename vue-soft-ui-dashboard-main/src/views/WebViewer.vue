  <template>
    <div id="webviewer" ref="viewer"></div>
  </template>

  <script>
  import { ref, onMounted } from "vue";
  import WebViewer from "@pdftron/webviewer";

  export default {
    name: "WebViewer",
    props: { initialDoc: { type: String } },
  setup(props) {
      const viewer = ref(null);
      onMounted(() => {
        const path = `${process.env.BASE_URL}webviewer`;
        WebViewer({ 
          path, 
          enableOfficeEditing:true,
          initialDoc: props.initialDoc, 
          licenseKey: 'demo:1709638961050:7f255e8c03000000003f037e7ea52f75245cf1967d95fa3948ed0d4065'  // sign up to get a free trial key at https://dev.apryse.com
        }, viewer.value).then(
          (instance) => {            
            instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);
            instance.UI.setToolbarGroup(instance.UI.ToolbarGroup.EDIT_TEXT);            
            const { documentViewer, annotationManager, Annotations } =instance.Core;           

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
          }
        );
      });
      return {
        viewer,
      };
    },
  };
  </script>

  <style>
  #webviewer {
    height: 100%;
    width: 100%;
  }
  </style>
