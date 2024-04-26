import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Tables from '@/views/Tables.vue'
import Billing from '@/views/Billing.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import AdminSignIn from '@/views/AdminSignIn.vue'
import UserBoard from '@/views/UserBoard.vue'
import Dms from '@/views/Dms.vue'
import AdminBoard from '@/views/adminBoard/AdminBoard.vue'
import UserInformation from '@/views/adminBoard/UserInfo.vue'
import GroupInformation from '@/views/adminBoard/GroupInfo.vue'
import MetaData from '@/views/adminBoard/MetaData.vue'
import AccessRights from '@/views/adminBoard/AccessRights.vue'
import Folders from '@/views/Folders.vue'
import Search from '@/views/Search.vue'
import Portal from '@/views/Portal.vue'
import Home from '@/views/Home.vue'
import ImageUpscaling from '@/views/ImageUpscaling.vue'
import Ocr from '@/views/Ocr.vue'
import ViewFolder from '@/views/ViewFolder.vue'
import LicenceManagement from '@/views/adminBoard/LicenceManagement.vue'
import WorkflowManagement from '@/views/adminBoard/WorkflowManagement.vue'
import Ckyc from '@/views/adminBoard/Ckyc.vue'
import DCDRConfigur from '@/views/adminBoard/DCDRConfigur.vue'
import DigitalSignature from '@/views/adminBoard/DigitalSignature.vue'
import MountPoints from '@/views/adminBoard/MountPoints.vue'
import AdminProfile from '@/views/adminBoard/AdminProfile.vue'
import Scanner from '@/views/Scanner.vue'
import BackTo from '@/views/jobPack/BackTo.vue'
import JobPack from '@/views/JobPack.vue'
import JobPackCreation from '@/views/jobPack/JobPackCreation.vue'
import ForgotPassword from '@/views/components/ForgotPassword.vue'
import store from '../store/index.js'
import LoanAgreement from '@/views/jobPack/LoanAgreement.vue'

// New Doc

import Browser from '../views/newDoc/Browser.vue'
import Admin from '../views/newDoc/Admin.vue'
import Recent from '../views/newDoc/Recent.vue'
import Bookmark from '../views/newDoc/Bookmark.vue'
import RecycleBin from '../views/newDoc/RecycleBin.vue'
import SharedToYou from '../views/newDoc/SharedToYou.vue'
import SharedByYou from '../views/newDoc/SharedByYou.vue'

const formData = store.getters.getFormData
const dynamicChildRoutes = formData.map((form) => ({
  path: form.formName.toLowerCase().replace(/\s+/g, '-'),
  name: form.formName.replace(/\s+/g, ''),
  component: LoanAgreement,
  meta: {
    formData: form,
  },
}))

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/sign-in',
  },
  {
    path: '/userBoard',
    name: 'userBoard',
    component: UserBoard,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '',
        name: 'Home',
        component: Home,
      },

      {
        path: '/browse',
        name: 'Browse',
        component: Browser,
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin,
      },
      {
        path: '/recent',
        name: 'Recent',
        component: Recent,
      },
      {
        path: '/bookmark',
        name: 'Bookmark',
        component: Bookmark,
      },
      {
        path: '/recycleBin',
        name: 'RecycleBin',
        component: RecycleBin,
      },
      {
        path: '/sharedToYou',
        name: 'SharedToYou',
        component: SharedToYou,
      },
      {
        path: '/sharedByYou',
        name: 'SharedByYou',
        component: SharedByYou,
      },
      {
        path: '/viewFolder',
        name: 'ViewFolder',
        component: ViewFolder,
        props: (route) => ({
          id: route.query.id,
          view: route.query.view,
          write: route.query.write,
          folderName: route.query.folderName,
          metaId: route.query.metaId,
        }),
      },
      {
        path: '/folders',
        name: 'Folders',
        component: Folders,
      },
      // {
      //   path: '/search',
      //   name: 'Search',
      //   component: Search,
      // },
      // {
      //   path: '/portal',
      //   name: 'Portal',
      //   component: Portal,
      // },
      // {
      //   path: '/imageUpscaling',
      //   name: 'Image Upscaling',
      //   component: ImageUpscaling,
      // },
      // {
      //   path: '/ocr',
      //   name: 'Ocr',
      //   component: Ocr,
      // },
      // {
      //   path: '/tables',
      //   name: 'Tables',
      //   component: Tables,
      // },
      // {
      //   path: '/billing',
      //   name: 'Billing',
      //   component: Billing,
      // },

      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      },

      {
        path: '/sign-in',
        name: 'Sign In',
        component: SignIn,
      },
      {
        path: '/adminSign-in',
        name: 'AdminSign In',
        component: AdminSignIn,
      },
      {
        path: '/sign-up',
        name: 'Sign Up',
        component: SignUp,
      },
      // {
      //   path: '/scanner',
      //   name: 'Scanner',
      //   component: Scanner,
      // },
      // {
      //   path: '/jobPack',
      //   name: 'JobPack',
      //   component: JobPack,
      // },
    ],
  },

  {
    path: '/adminBoard',
    name: 'adminBoard',
    component: AdminBoard,
    children: [
      {
        path: '',
        name: 'User Information',
        component: UserInformation,
      },
      {
        path: '/groupInfo',
        name: 'Group Information',
        component: GroupInformation,
      },
      {
        path: '/metaData',
        name: 'Meta Data',
        component: MetaData,
      },
      {
        path: '/accessrights',
        name: 'Access Rights',
        component: AccessRights,
      },
      {
        path: '/workflowManagement',
        name: 'Worlflow Management',
        component: WorkflowManagement,
      },
      {
        path: '/LicenceManagement',
        name: 'Licence Management',
        component: LicenceManagement,
      },
      {
        path: '/ckyc',
        name: 'CKYC',
        component: Ckyc,
      },
      {
        path: '/dcdrConfigur',
        name: 'DCDR Configure',
        component: DCDRConfigur,
      },
      {
        path: '/digitalSignature',
        name: 'Digital Signature',
        component: DigitalSignature,
      },
      {
        path: '/mountPoints',
        name: 'Mount Points',
        component: MountPoints,
      },
      {
        path: '/adminProfile',
        name: 'Admin Profile',
        component: AdminProfile,
      },
    ],
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },

  {
    path: '/jobPack-creation',
    name: 'JobPackCreation',
    component: JobPackCreation,
    children: dynamicChildRoutes,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

export default router
