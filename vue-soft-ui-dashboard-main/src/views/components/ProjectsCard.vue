<template>
  <div class="card" style="height: 100%;">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>User Groups Data</h6>
          <!-- <p class="text-sm mb-0">
            <i class="fa fa-check text-info" aria-hidden="true"></i>
            <span class="font-weight-bold ms-1">30 done</span> this month
          </p> -->
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a
              class="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul
              class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
              aria-labelledby="dropdownTable"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Another action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                style="font-size: 0.7rem !important"
                v-for="header in headers"
                :key="header.key"
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                :style="{
                  'padding-inline-start':
                    header.key === 'groupMembers'? '8px !important' : '',
                    'text-align':header.key === 'completion' ?'center':'left'
                }"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="text-align: left;" v-for="(groupDetail,index) in groupDetails"
                :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center pl-3">
                    <h6 class="mb-0 text-sm">{{groupDetail.groupName }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <a
                   v-for="(groupMember,index) in groupDetail.groupMembers" :key="index"
                    href="javascript:;"
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    :title="groupMember"
                    style="position: relative;"
                  >
                    <img src="@/assets/img/user.png" rounded-circle alt="team1"/>
                  </a>
                </div>
              </td>
              <td class="">
                <span class="text-xs font-weight-bold pl-5">{{groupDetail.groupUploadedFileSize }}kb</span>
              </td>
              <td class="">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="text-xs font-weight-bold mx-2">60%</span>
                  <div>
                    <soft-progress
                      color="info"
                      class="mx-auto"
                      variant="gradient"
                      :percentage="60"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import axios from "axios";
import SoftProgress from "@/components/SoftProgress.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";


export default {
  name: "projects-card",
  data() {
    return {
      groupDetails:null,
      headers: [
        {
          key: "groupName",
          title: "Group Name",
        },
        {
          key: "groupMembers",
          title: "group members",
        },
        {
          key: "groupsFileSize",
          title: "Group File size",
        },
        {
          key: "completion",
          title: "completion",
        },
      ],
    };
  },
  components: {
    SoftProgress,
    SoftAvatar
  },
  mounted() {
    setTooltip();
    this.getUserGroupDetails();
  },

  methods: {
    async getUserGroupDetails() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      const apiUrl = `http://localhost:61050/dms/dashboard/getUserGroupDetails`;
      const token = this.$store.getters.getUserToken;
      await axios
        .get(apiUrl, {
          headers: {
            token: token,
          },
        })
        .then((response) =>{
          this.groupDetails=response.data,
          console.log(response.data);

        }
      )
        .catch((error) => console.error("Error occured by", error));
    },
  },
};
</script>
<style scoped>
.avatar:hover::after {
  content: attr(title); /* Display the title attribute content */
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  top: -130%; /* Position the tooltip below the avatar */
  left: 100%; /* Center the tooltip horizontally */
  transform: translateX(-50%); /* Adjust horizontally centered position */
  white-space: nowrap; /* Prevent line breaks */
  z-index: 999; /* Ensure the tooltip appears above other content */
}
</style>
