<template>
  <div>
    <div class="container-fluid">
      <div class="row" style="margin-top: 0.5rem !important">
        <div class="col-12">
          <div class="card" style="height: 513px !important">
            <div class="newButton">
              <v-btn @click="openFolderDialogeBox = true">Submit</v-btn>
            </div>
            <div class="card-header text-uppercase">
              <h4>{{ formTitle }}</h4>
            </div>
            <div class="card-body px-0 pt-0 pb-0" style="overflow: hidden">
              <v-container class="overflow-container">
                <v-row>
                  <v-col v-for="(field, index) in fields" :key="index" cols="4">
                    <label>{{ field.fieldName }}</label>
                    <div class="mb-3">
                      <input
                        v-model="field.value"
                        :placeholder="field.fieldName"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fields: [],
      formTitle: '',
    };
  },
  mounted() {
    this.getFields();
  },
  methods: {
    async getFields() {
      const api = "http://localhost:61050/dms/jobPack/getAllTemplate";
      const token = this.$store.getUserToken;

      await axios
        .get(api, {
          headers: token,
        })
        .then((resposne) => {
          this.fields = resposne.data.fieldName.map((field) => ({
            label: field.label,
            placeholder: `Enter ${field.label}`,
            value: "",
          }));
          const formName = resposne.data.map((ele) => ele.formName);
          this.$store.commit("setFormData", formName);
        });
    },
  },
};
</script>

<style scoped>
.mb-3 > input {
  display: block;
  width: 85%;
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

.overflow-container {
  overflow: auto;
  max-height: calc(100vh - 200px); /* Adjust the maximum height as needed */
}

.newButton {
  position: fixed;
  bottom: 5%;
  right: 2%;
  margin-right: 2%;
}
.newButton > .v-btn {
  background-image: linear-gradient(310deg, #5cc06e, #82d616) !important;
  color: #fff;
  transition: 0.5s ease;
  margin-left: 2%;
  font-weight: bold;
  font-size: 0.7rem !important;
  height: 2rem !important;
}

.newButton > .v-btn:hover {
  cursor: pointer;
}
</style>
