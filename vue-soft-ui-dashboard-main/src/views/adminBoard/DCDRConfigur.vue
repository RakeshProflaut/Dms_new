<template>
  <div class="container-fluid">
     <div
       class="mt-4 page-header min-height-300 border-radius-xl"
       :style="{
         backgroundImage:
           'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
         backgroundPositionY: '50%',
       }"
     >
     </div>
   </div>  
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import setNavPills from "@/assets/js/nav-pills.js";
import Swal from "sweetalert2";

export default {
name:'dcdrConfigur',
mounted() {
   this.$store.state.isAbsolute = true;
   setNavPills();
   setTooltip(this.$store.state.bootstrap);
   this.getNotification();
 },
 beforeUnmount() {
   this.$store.state.isAbsolute = false;
 },
 methods:{
   getNotification(){
     Swal.fire({
 title: "No Authorisation to this Menu",
 showClass: {
   popup: `
     animate__animated
     animate__fadeInUp
     animate__faster
   `
 },
 hideClass: {
   popup: `
     animate__animated
     animate__fadeOutDown
     animate__faster
   `
 }
});
this.$router.push("/accessrights");
   }
 }

}
</script>

<style scoped>
.min-height-300 {
 min-height: 75px !important;
}


</style>