import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PageHome.vue') }],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PageAbout.vue') }],
  },

  {
    path: '/search',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Search.vue') }],
  },




  {
    path: '/sell',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Sell.vue') }],
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },

  {
    path: '/blog',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Blog.vue') }],
  },

  {
    path: '/reset',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Reset.vue') }],
  },

  {
    path: '/signup',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Signup.vue') }],
  },

  {
    path: '/asset',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Asset.vue') }],
  },

  {
    path: '/privacy',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Privacy.vue') }],
  },


  {
    path: '/homes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Homes.vue') }],
  },

  {
    path: '/land',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Land.vue') }],
  },

  {
    path: '/buildings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Commercial.vue') }],
  },


  {
    path: '/businesses',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Business.vue') }],
  },

  {
    path: '/services',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Services.vue') }],
  },

  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Profile.vue') }],
  },

  {
    path: '/sold',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Sold.vue') }],
  },

  {
    path: '/deleted',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Deleted.vue') }],
  },

  {
    path: '/messages',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Messages.vue') }],
  },
  {
    path: '/chat',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/Chat.vue') }],
  },
{
  path: '/text',
  component: () => import('layouts/MainLayout.vue'),
  children: [{ path: '', component: () => import('components/Chat2.vue') }],
},


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',

    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
