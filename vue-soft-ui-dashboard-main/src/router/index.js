import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import AdminSignIn from "@/views/AdminSignIn.vue"
import UserBoard from "@/views/UserBoard.vue"
import Dms from "@/views/Dms.vue"
import AdminBoard from "@/views/adminBoard/AdminBoard.vue"
import UserInformation from "@/views/adminBoard/UserInfo.vue"
import GroupInformation from "@/views/adminBoard/GroupInfo.vue"
import MetaData from "@/views/adminBoard/MetaData.vue"
import AccessRights from "@/views/adminBoard/AccessRights.vue"
import Folders from "@/views/Folders.vue"


const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/sign-in",
  },
  {
    path: '/userBoard',
    name: 'userBoard',
    component: UserBoard,
    children:[
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/dms",
        name: "Dms",
        component: Dms,
      },
      {
        path: "/folders",
        name: "Folders",
        component:Folders,
      },
      {
        path: "/tables",
        name: "Tables",
        component: Tables,
      },
      {
        path: "/billing",
        name: "Billing",
        component: Billing,
      },
     
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      
      {
        path: "/sign-in",
        name: "Sign In",
        component: SignIn,
      },
      {
        path: "/adminSign-in",
        name: "AdminSign In",
        component: AdminSignIn,
      },
      {
        path: "/sign-up",
        name: "Sign Up",
        component: SignUp,
      },   
     
    ]
  }, 

  {
    path: '/adminBoard',
    name: 'adminBoard',
    component: AdminBoard,
    children:[
      {
        path: "",
        name: "User Information",
        component: UserInformation,
      },
      {
        path: "/groupInfo",
        name: "Group Information",
        component: GroupInformation,
      },
      {
        path: "/metaData",
        name: "Meta Data",
        component: MetaData,
      },
      {
        path: "/accessrights",
        name: "Access Rights",
        component: AccessRights,
      },
    ]

    }
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
