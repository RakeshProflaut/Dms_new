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
                src="@/assets/img/bruce-mars.jpg"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">Alec Thompson</h5>
              <p class="mb-0 text-sm font-weight-bold">CEO / Co-Founder</p>
            </div>
          </div>
          <div
            class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
          >
            <div class="nav-wrapper position-relative end-0">
              <ul
                class="p-1 bg-transparent nav nav-pills nav-fill"
                role="tablist"
              >
                <li v-for="tab in tabs" v-bind:key="tab.value" class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link active"
                    data-bs-toggle="tab"
                    href="javascript:;"
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      class="text-dark"
                      width="16px"
                      height="16px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    ></svg>
                    <span class="ms-1">{{ tab.title }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="mt-3 row"></div>
      <div class="mt-4 row">
        <div class="col-12">
          <div class="mb-4 card">
            <div class="p-3 pb-0 card-header">
              <h6 class="mb-1">Projects</h6>
              <p class="text-sm">Architects design houses</p>
            </div>
            <div class="py-4 container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                      <table class="custom-table table align-items-center justify-content-center mb-0">
      <thead>
        <tr>
          <th    v-for="(header, index) in headers" :key="index">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in desserts" :key="rowIndex">
            <td v-for="(header, headerIndex) in headers" :key="headerIndex">
                {{ row[header.key] }}
            </td>
        </tr>
      </tbody>
    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "dms",
  components: {},
  data() {
    return {
      showMenu: false,
      faFacebook,
      faTwitter,
      faInstagram,
      tabs: [
        { value: "maker", title: "Maker" },
        { value: "checker", title: "Checker" },
      ],
      search: "",
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
      headers: [
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Dessert (100g serving)",
        },
        { key: "calories", title: "Calories" },
        { key: "fat", title: "Fat (g)" },
        { key: "carbs", title: "Carbs (g)" },
        { key: "protein", title: "Protein (g)" },
        { key: "iron", title: "Iron (%)" },
      ],
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
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.custom-table th, .custom-table td {
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: left;
}

.custom-table th {
  background-color: #007bff;
  color: #fff;
}

.custom-table tbody tr:hover {
  background-color: #f8f9fa;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  /* background-color: #007bff; */
  color: #fff;
  border-radius: 12px 12px 0 0;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
}

</style>
