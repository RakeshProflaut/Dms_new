<template>
  <div>
    <div class="mt-3 row"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card" style="height: 510px !important">
            <div style="display: flex; justify-content: space-between"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from '@/assets/js/tooltip.js'
import setNavPills from '@/assets/js/nav-pills.js'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Admin',

  mounted() {
    this.$store.state.isAbsolute = true
    setNavPills()
    setTooltip(this.$store.state.bootstrap)
    this.getLogout()
  },
  methods: {
    async getLogout() {
      const confirmed = await Swal.fire({
        title: 'Are you sure you want to leave this page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5FC0FF',
        cancelButtonColor: '#C72E2E',
        confirmButtonText: 'Yes',
        timerProgressBar: true,
      })

      if (confirmed.isConfirmed) {
        this.putLogout()
      }
    },

    async putLogout() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

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
            this.$router.push({ name: 'AdminSign In' })
          }, 500)
        })
        .catch((error) => console.error('Error occured by', error))
    },
  },
}
</script>

<style scoped>
.min-height-300 {
  min-height: 75px !important;
}

.card .card-header {
  padding: 0.5rem !important;
}
</style>
