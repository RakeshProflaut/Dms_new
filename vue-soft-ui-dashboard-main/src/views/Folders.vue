<template>
    <div>
      <div class="container-fluid">
        <div
          class="mt-4 page-header min-height-300 border-radius-xl"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
            backgroundPositionY: '50%',
          }"
        >
          <span class="mask bg-gradient-success opacity-6"></span>
        </div>
        <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="@/assets/img/user.png"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ this.$store.getters.getUserName }}</h5>
                <p class="mb-0 text-sm font-weight-bold">
                  User Id-{{ this.$store.getters.getUserId }}
                </p>
              </div>
            </div>           
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="mt-3 row"></div>
        <div class="mt-4 row">
          <div class="col-12">
           
            <v-card
              style="
                max-height: 100%;
                overflow: auto;
                border-radius: 1rem;
               
              "
            >
              <div class="dmsHeader">              
                <input
                  type="text"
                  v-model="search"
                  label="Search"
                  placeholder="Filter"
                  single-line
                  variant="outlined"
                  hide-details
                  class="searchBar"
                />
              </div>
              <v-card style="width: 100%; height: 450px; overflow: hidden">
                <v-data-table
                  :headers="headers"
                  :items="options"
                  :item-key="'customerId'"
                  :search="search"
                  style="height: 456px; overflow-y: auto"
                >
                  <template v-slot:[`item.action`]="{ item }">
                    <v-icon
                      size="small"
                      class="mdi mdi-open-in-new"
                      @click="openWorkItem(item)"
                    >
                    </v-icon>
                  </template>
                  <template v-slot:[`item.sno`]="{ item }">
                  {{ options.indexOf(item) + 1 }}
                </template>
                </v-data-table>      
              </v-card>           
            </v-card>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>  
  import setNavPills from "@/assets/js/nav-pills.js";
  import setTooltip from "@/assets/js/tooltip.js";
  import axios from "axios";
  export default {
    name: "dms",
    data() {
      return {
        search: "",
        headers:[
            {   
                align: 'start',
                sortable: false,
                key:'sno',
                title:'SNo',
            },
            {
                key:'folderName',
                title:'FOLDER NAME',
            },
            {
                key:'folderPath',
                title:'FOLDER PATH',
            },
            {
                key:'createdBy',
                title:'CREATED BY',
            },
            {
                key:'createdAt',
                title:'CREATED AT',
            },
            {
                key:'action',
                title:'Action',
            },
        ],
        options:[
            {
                folderName:'dms',
                folderPath:'/d',
                createdBy:'rahual',
                createdAt:'7:20',
            }
        ]
      };
    },
  
    mounted() {
      this.$store.state.isAbsolute = true;
      setNavPills();
      setTooltip(this.$store.state.bootstrap);
    },
    beforeUnmount() {
      this.$store.state.isAbsolute = false;
    },
   
  };
  </script>
  
  <style scoped>
  
  body > div.v-overlay-container > div > div.v-overlay__content > div {
    height: 150%;
    width: 102%;
    margin-left: -10px;
  }
  .searchBar {
    border: 1px solid;
    margin-right: 10px;
    margin-left: 10px; /* Add margin for spacing between button and search bar */
    max-width: 25%; /* Set the maximum width to avoid elongation */
    display: block;
    height: 40px !important;
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
  
  .dmsHeader {
    display: flex;
    justify-content: flex-end;
    margin: 1% 0px;
  }
  .v-card-text {
    padding: 0;
  }
  .dmsHeader > .v-btn {
    background: #87e42e;
    transition: 0.5s ease;
  }
  .dmsHeader > .v-btn:hover {
    cursor: pointer;
    background-image: linear-gradient(70deg, #17ad37 0%, #98ec2d 100%);
  }
  
  #app
    > div
    > div.dashboard
    > div.content
    > div
    > div
    > div.v-card-text.card-text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    padding: 0.5px;
    text-transform: none;
  }
  
  
  
  .min-height-300 {
    min-height: 101px !important;
  }
  </style>
  