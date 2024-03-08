<template>
    <svg
      width="120px"
      height="120px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2C8.68629 2 6 4.68629 6 8V9H4C3.44772 9 3 9.44772 3 10V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V10C21 9.44772 20.5523 9 20 9H18V8C18 4.68629 15.3137 2 12 2ZM18 12V13H21V19H3V13H6V12H18ZM12 4C14.7614 4 17 6.23858 17 9H7C7 6.23858 9.23858 4 12 4ZM11 7V10H13V7H11Z"
        :fill="color || '#000000'"
      />
    </svg>
  </template>
  
  <script>
  export default {
    props: {
      color: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  