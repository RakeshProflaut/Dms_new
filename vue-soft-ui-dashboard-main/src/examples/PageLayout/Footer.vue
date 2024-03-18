<template>
  <footer class="footer text-right" style="background-color:#fff !important;">    
          <p class="mr-5 text-secondary pt-2">
            ©powered by PROFLAUT Technologies
          </p>
  </footer>
</template>

<script>
export default {
  name: "app-footer"
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fe;
  padding: 10px 0;
  text-align: center;
  padding-top: 3%;
}

/* Adjustments for small screens */
@media (max-width: 768px) {
  .footer {
    position: relative;
    bottom: auto;
  }
}
</style>
