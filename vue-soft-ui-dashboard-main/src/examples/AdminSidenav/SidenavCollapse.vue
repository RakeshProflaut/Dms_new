<template>
  <router-link class="nav-link" :to="to" v-bind="$attrs">
    <div
      class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
      :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
    >
    <mdi :icon="navIcon"/>
    </div>
    <span
      class="nav-link-text"
      :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span
    >
  </router-link>
</template>
<script>
import { mdi } from 'material-design-icons-iconfont/dist/material-design-icons.css';
export default {
  name: "sidenav-collapse",
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  components: {
    // Import the MDI component
    mdi,
  },
};
</script>

<style scoped>
.nav-link:hover >div{
  background: #55B6F6 !important;
}

.nav-link:hover .icon{
  color: #fff !important;
}
</style>

