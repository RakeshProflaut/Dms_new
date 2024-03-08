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
        d="M6 3C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3H6ZM8 5H16V8H8V5ZM8 9H16V12H8V9ZM8 13H16V16H8V13ZM17 5V8H15V5H17ZM17 9V12H15V9H17ZM17 13V16H15V13H17ZM7 22H17V20H7V22ZM3 0V24H21V0H3Z"
        :fill="color || '#000000'"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 22H17V20H7V22ZM3 0V24H21V0H3Z"
        fill-opacity="0.3"
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
  