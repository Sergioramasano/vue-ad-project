import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from "./auth-guard";
import Login from "../components/Auth/Login";
import Home from "../components/Home";
import Registration from "../components/Auth/Registration";
import Ad from "../components/Ads/Ad";
import AdList from "../components/Ads/AdList";
import NewAd from "../components/Ads/NewAd";
import Orders from "../components/User/Orders";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'Ad',
    component: Ad,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'list',
    component: AdList,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'NewAd',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: AuthGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
