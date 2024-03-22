import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default createStore({
  state: {
    hideConfigButton: false,
    reachedLandingPage: false,
    token: null,
    folderDetails:{},
    formData:[],
    userId: null,
    userName:"",
    templete:"",
    adminName:null,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    setReachedLandingPage(state, value) {
      state.reachedLandingPage = value;
    },
    setData(state, newData) {
      state.token = newData;
    },
    userToken(state, tokenValue) {
      return (state.token = tokenValue);
    },
    userId(state, userIdValue) {
      return (state.userId = userIdValue);
    },
    userName(state, userNamevalue) {
      return (state.userName = userNamevalue);
    },
    adminName(state, adminName) {
      return (state.adminName = adminName);
    },
    templeteStatus(state, templeteStatus) {
      return (state.templete = templeteStatus);
    },
    setFolderDetails(state, obj) {
      state.folderDetails = obj;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    setFormData(state, formData) {
      state.formData = formData;
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    setGlobalData(state, newData) {
      state.token = newData; // Mutation to update the global data
    },
    setFolderDetails({ commit }, obj) {
      commit('setObject', obj);
    },
  },
  getters: {
    getUserToken(state) {
      return state.token;
    },
    getUserId(state) {
      return state.userId;
    },
    getAdminName(state) {
      return state.adminName;
    },
    getUserName(state) {
      return state.userName;
    },
    getTemplets(state) {
      return state.templete;
    },
    getFolderDetails(state) {
      return state.folderDetails;
    },
    getFormData(state){
      return state.formData;
    }
  },
});
