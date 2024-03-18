<template>
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 48 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>scanner</title>
      <g fill="" fill-rule="evenodd">
        <!-- Scanner Body -->
        <path
          fill="#000000"
          stroke="#000000"
          stroke-width="3"
          d="M5 0a5 5 0 00-5 5v38a5 5 0 005 5h38a5 5 0 005-5V5a5 5 0 00-5-5H5zm0 2h38a3 3 0 013 3v34a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3z"
        />
        <!-- Scanner Glass -->
        <path
          fill="#000000"
          stroke="#000000" 
          stroke-width="3" 
          d="M24 29.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zm0-8.999a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"
        />
      </g>
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
  