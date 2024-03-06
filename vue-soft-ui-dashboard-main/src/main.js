/**
=========================================================
* Vue Soft UI Dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Import the icons stylesheet
import Vue2Editor from "vue2-editor";
import axios from "axios";
import { registerLicense } from '@syncfusion/ej2-base';
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import VueApexCharts from "vue3-apexcharts";



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconFont: "mdi",
  },
})
registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVFpR2Nbe05zflVPal5WVAciSV9jS3pTdEViWXxeeXZdRWNeVA==")

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(RichTextEditorPlugin);
appInstance.use(router);
appInstance.use(VueApexCharts)
appInstance.use(vuetify);
appInstance.use(SoftUIDashboard);
appInstance.use(Vue2Editor);
appInstance.mount("#app")
