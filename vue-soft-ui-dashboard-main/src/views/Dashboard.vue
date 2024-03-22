<template>
  <div>
    <div class="py-2 container-fluid">
      <div class="row justify-content-center " style="padding: .1rem 0px;">
        <div class="col-lg-7 mb-lg-0 mb-4">
          <div
            class="card"
            style="
              display: flex !important;
              flex-direction: row !important ;
              padding: 0.5rem;
            "
          >
            <div class="health">Health :</div>
            <div class="marquee">
              <div class="marquee-content">No Issues Till Now !!!</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-xl-3 col-sm-6 mb-xl-0 mb-4"
          v-for="(detail, index) in details.slice(0, 4)"
          :key="index"
        >
          <div class="mb-1 card">
            <div class="p-3 card-body">
              <div class="d-flex flex-row-reverse justify-content-between">
                <div>
                  <div
                    class="text-center shadow icon icon-shape border-radius-md"
                  >
                    <span :class="detail.icon" aria-hidden="true"></span>
                  </div>
                </div>
                <div>
                  <div class="numbers">
                    <p class="mb-0 text-sm text-capitalize font-weight-bold">
                      {{ detail.title }}
                    </p>
                    <h5 class="mb-0 font-weight-bolder">
                      {{ detail.value }}
                      <span class="text-sm font-weight-bolder"> </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
            <!-- 
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <p class="mb-1 pt-2 text-bold">Built by</p>
                  <h5 class="font-weight-bolder">PROFLAUT TECHNOLOGIES</h5>
                  <p class="mb-5">
                    We work in the advanced technologies in the Industries We
                    are more focused on Excellence and delivering the services
                    as per the client requirements.
                  </p>
                  <a
                  class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                  href="http://www.proflaut.com/"
                  >
                    Read More
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                      ></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                <div class="bg-gradient-success border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                    />
                  <div
                    class="position-relative d-flex align-items-center justify-content-center h-100"
                  >
                    <img
                      class="w-100 position-relative z-index-2 pt-4"
                      src="../assets/img/illustrations/rocket-white.png"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
            <!-- <div class="col-lg-5">
        <div class="card h-100 p-3">
          <div
          class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
            style="
            background-image: url(&quot;https://demos.creative-tim.com/soft-ui-dashboard/assets/img/ivancik.jpg&quot;);
            "
            >
            <span class="mask bg-gradient-dark"></span>
            <div class="card-body position-relative z-index-1 p-3 h-100">
              <div class="d-flex flex-column h-100">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">DMS</h5>
                <p class="text-white mb-5">
                  DMS can store, manage and track electronic documents and
                  electronic images of paper-based information captured through
                  the use of a document scanner.
                </p>
                <a
                class="text-white font-weight-bold ps-1 mb-0 icon-move-left mt-auto"
                href="javascript:;"
                >
                Read more
                <i
                class="fas fa-arrow-right text-sm ms-1"
                aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
          </div>
        -->         
      <div class="mt-4 row" style="">
      <div class="mb-4 col-lg-5">
        <div class="card z-index-2">
          <div class="row justify-content-center ml-1 mr-1">
        <div
        style="margin:5px;"
          v-for="(detail, index) in details.slice(4)"
          :key="index"
        >
          <div class="mb-0 card" style="width:">
            <div class="p-3 card-body">
              <div class="d-flex flex-row-reverse justify-content-between">
                <div>
                  <div
                    class="text-center shadow icon icon-shape border-radius-md"
                  >
                    <span :class="detail.icon" aria-hidden="true"></span>
                  </div>
                </div>
                <div>
                  <div class="numbers">
                    <p class="mb-0 text-sm text-capitalize font-weight-bold">
                      {{ detail.title }}
                    </p>
                    <h5 class="mb-0 font-weight-bolder">
                      {{ detail.value }}
                      <span class="text-sm font-weight-bolder"> </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
          <div class="p-3 card-body">
            <div class=" pb-0 card-header" style="padding: 0!important;">          
          <h6>Average File Size Chart</h6>
              </div>
            <reports-bar-chart
            v-if="userReportData && userReportData.length > 0"
            id="chart-bar"
            title=""
            description="(<strong>+23%</strong>) than last week"
            :chart="reportData"
            :items="[]"
            />
            <reports-bar-chart
            v-else
            id="chart-bar"
            title=""
            description="(<strong>+23%</strong>) than last week"
            :chart="reportData"
            :items="[]"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-7">   
        <div class="card z-index-2">
          <gradient-line-chart
          v-if="uploadDownloadLabel && uploadDownloadLabel.length > 0"
          id="chart-line"
          title="Upload/Download Speed Line Chart"
          description="<i class='fa fa-arrow-up text-success'></i>
          <span class='font-weight-bold'>Uploads</span> in 2024
        <i class='fa fa-arrow-down text-success'></i>
          <span class='font-weight-bold'>Downloads</span> in 2024
          "
          :chart="{
            labels:this.uploadDownloadLabel,
              datasets: [
                {
                  label: 'Upload Speed(ms)',
                  data: this.avgUploadSpeed,
                },
                {
                  label: 'Download Speed(ms)',
                  data:this.avgDownloadSpeed,
                },
              ],
            }"
          />
          <gradient-line-chart
          v-else
          id="chart-line"
          title="Upload/Download Speed Line Chart"
          description="<i class='fa fa-arrow-up text-success'></i>
          <span class='font-weight-bold'>Uploads</span> in 2024
        <i class='fa fa-arrow-down text-success'></i>
          <span class='font-weight-bold'>Downloads</span> in 2024
          "
          :chart="{
            labels:this.uploadDownloadLabel,
              datasets: [
                {
                  label: 'Upload Speed(ms)',
                  data: this.avgUploadSpeed,
                },
                {
                  label: 'Download Speed(ms)',
                  data:this.avgDownloadSpeed,
                },
              ],
            }"
          />
        </div>
      </div>
    </div>
    
    <div class="my-4">
      <div class="card" style="height:14.5rem;" v-if="this.stackedSeries[0].data && this.stackedSeries[0].data.length > 0">
        <div class="p-3 pb-0 card-header" style="padding: 0.5rem !important;">          
          <h6>Total Uploads And Downloads Data</h6>
              </div>
              <div style="overflow-x: auto;">                
                <apexchart
                type="bar"
                height="180rem"
                width="1020px"
                :options="stackedChartOptions"
                :series="stackedSeries"
                ></apexchart>
              </div>        
      </div>
      <div class="card" style="height:14.5rem;" v-else>
        <div class="p-3 pb-0 card-header" style="padding: 0.5rem !important;">          
          <h6>Total Uploads And Downloads Data</h6>
              </div>
              <div style="overflow-x: auto;">                
                <apexchart
                type="bar"
                height="180rem"
                width="1020px"
                :options="stackedChartOptions"
                :series="stackedSeries"
                ></apexchart>
              </div>        
      </div>
      </div>
      <div class="my-4">
      <div class="card" style="height:14.5rem;">
          <projects-card />
          </div>
          </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import TimelineList from "./components/TimelineList.vue";
import TimelineItem from "./components/TimelineItem.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import { markRaw } from "vue";
import BR from "../assets/img/icons/flags/BR.png";
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";

import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      uploadDownloadLabel:null,   
      reportData: {
        labels: [],
        datasets: {
          label: "Users",
          data: [],
        },
      },
      avgUploadSpeed:null,
      avgDownloadSpeed:null,
      userReportLabel: null,
      userReportData: null,
      totalUpload:null,
      totalDownloads:null,
      totalUploadAndDownloadLabel:null,
      stackedChartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        dataLabels: {
          formatter: (val) => {
            return val;
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories:[],
        },
        fill: {
          opacity: 1,
        },
        colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
        yaxis: {
          labels: {
            formatter: (val) => {
              return val;
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
      },
      stackedSeries: [
        {
          name: "Uploads",
          group: "budget",
          data: [],
        },

        {
          name: "Downloads",
          group: "budget",
          data: [],
        },
      ],
      details: [
        {
          title: "Total Uploads",
          value: "0",
          icon: "mdi mdi-upload-box-outline",
          backendKey: "userUploadedCount",
        },
        {
          title: "Total Downloads",
          value: "0",
          icon: "mdi mdi-download-box-outline",
          backendKey: "userDownloadCount",
        },
        {
          title: "Total Folders",
          value: "0",
          icon: "mdi mdi-folder-outline",
          backendKey: "userFolderCreated",
        },
        {
          title: "Files Occupied",
          value: "0",
          icon: "mdi mdi-file-multiple",
          backendKey: "userFileOccupiedSize",
        },
        // {
        //   title: "Average File Size Upload",
        //   value: "0",
        //   icon: "mdi mdi-file-multiple",
        //   backendKey: "averageFileUploade",
        // },
        {
          title: "Average File Upload Speed",
          value: "0",
          icon: "mdi mdi-tray-arrow-up",
          backendKey: "averageUploadSpeed",
        },
        {
          title: "Average File Download Speed",
          value: "0",
          icon: "mdi mdi-tray-arrow-down",
          backendKey: "averageDownloadSpeed",
        },
      ],
      fetchUserDetails: null,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    ProjectsCard,
    TimelineList,
    TimelineItem,
  },

  mounted() {
    window.addEventListener("popstate", this.handleBackButton);
    this.getUserReport();
    this.getUploadDownloadSpeed();
    this.getUploadsAndDownloads();
    setNavPills();
    this.$store.state.isAbsolute = true;
    setTooltip(this.$store.state.bootstrap);
    this.getAllDetails();
    this.getUserDetails();
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.handleBackButton);
    this.$store.state.isAbsolute = false;
  },

  methods: {
    async getAllDetails() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/getUserFullDetails`; 
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          // console.log("responseData",response.data);
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getUserDetails() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/getUserFullDetails`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.fetchUserDetails = response.data;
          this.details.forEach((detail) => {          
              detail.value = this.fetchUserDetails[detail.backendKey];
          });
        })
        .catch((error) => console.error("Error occured by", error));
    },

    async getUserReport() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/usersGraph`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          const userReportData = response.data.map((ele) => ele.avgFileUpload);
          const userReportLabels = response.data.map((ele) => ele.date);
          this.reportData.labels =(userReportLabels);
          this.reportData.datasets = {
            label: "Average File Size",
            data:(userReportData),
          };
          this.userReportData =(userReportData);
        })
        .catch((error) => console.error("Error occured by", error));
    },    
    async getUploadDownloadSpeed() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/linearGraph`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.uploadDownloadLabel = response.data.map((ele) => ele.date);
          this.avgDownloadSpeed=response.data.map((ele) => ele.avgDownloadSpeed);
          this.avgUploadSpeed=response.data.map((ele) => ele.avgUploadSpeed);
          console.log("uploadDownloadSpeed",this.uploadDownloadLabel);       
        })
        .catch((error) => console.error("Error occured by", error));
    },    
    async getUploadsAndDownloads() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/totalUploDown`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.stackedChartOptions.xaxis.categories = response.data.map((ele) => ele.date);
          console.log("upppppploooooads",this.stackedChartOptions.xaxis.categories);
          this.stackedSeries[0].data=response.data.map((ele) => ele.TotalUpload);
          this.stackedSeries[1].data=response.data.map((ele) => ele.TotalDownload);
          console.log("uploadDownloadSpeed",  this.stackedSeries[0].data);       

        })
        .catch((error) => console.error("Error occured by", error));
    },

    handleBackButton(event) {
    if (this.$store.state.reachedLandingPage) {
      event.preventDefault();
      // Display logout popup
      // You can call a method to show your logout popup here
      this.putLogout();
    }
  },

  async putLogout() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      console.log("token", this.$store.getters.getUserToken);
      console.log("userid", this.$store.getters.getUserId);
      console.log("templete", this.$store.getters.getTemplets);
      const templete = this.$store.getters.getTemplets;

      await axios
        .delete(
          `http://localhost:61050/dms/access/logout/${this.$store.getters.getUserId}`,
          {
            headers: {
              token: this.$store.getters.getUserToken,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            if (templete === "user") {
              this.$router.push({ name: "Sign In" });
            } else {
              this.$router.push({ name: "AdminSign In" });
            }
          }, 500);
        })
        .catch((error) => console.error("Error occured by", error));
    },
  
  },
};
</script>

<style scoped>
.icon-shape > span {
  position: relative;
  color: #fff;
  font-size: 2rem;
}

.min-height-300 {
  min-height: 75px !important;
}

.card .card-header {
  padding: 1rem !important;
}
.icon-shape {
  background-image: linear-gradient(310deg, #17ad37 0%, #98ec2d 100%);
}

.container-fluid {
  height: 78vh;
  width: 100%;
  overflow-y: scroll !important;
  overflow-x: hidden;
}

.container {
  width: 100%;
  padding-right: var(--bs-gutter-x, 1.5rem);
  padding-left: var(--bs-gutter-x, 1.5rem);
  margin-right: auto;
  margin-left: auto;
}

::-webkit-scrollbar {
  width: 0.3px; /* width of the scrollbar */
  border-radius: 13px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* color of the track */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #5cc06e; /* color of the handle */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5cc06e; /* color of the handle on hover */
}

.marquee {
  overflow: hidden;
  flex-basis: 90%;
}

.marquee-content {
  white-space: nowrap;
  animation: marquee 9s linear infinite;
  color: #53ca33;
  font-weight: 700;
  text-shadow:
    -200px 0 50px rgba(83, 202, 51, 0.8),
    /* Left shadow */ 200px 0 20px rgba(83, 202, 51, 0.8),
    /* Right shadow */ 0 0 10px rgba(83, 202, 51, 0.8),
    /* Center shadow */ 0 0 20px rgba(83, 202, 51, 0.8),
    /* Additional outer glow */ 0 0 30px rgba(83, 202, 51, 0.8),
    /* Additional outer glow */ 0 0 40px rgba(83, 202, 51, 0.8),
    /* Additional outer glow */ 0 0 50px rgba(83, 202, 51, 0.8); /* Additional outer glow */
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.health {
  flex-basis: 15%;
  margin-left: 2%;
  color: #67748e;
  text-transform: capitalize !important;
  font-weight: 700 !important;
}

.chart-container {
  width: 100%; /* Set width to 100% */
  height: 300px; /* Specify a fixed height */
}

</style>
