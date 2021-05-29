import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Dharmashala User
const Register = () => import('@/views/dharmashala/user/Register')
const UserList = () => import('@/views/dharmashala/user/List')
const Login = () => import('@/views/dharmashala/user/Login')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'dharmashala',
          redirect: '/dharmashala/user/register',
          name: 'Dharmashala',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/dharmashala/user/register',
              name: 'Register',
              component: Register
            },
            {
              path: '/dharmashala/user/list',
              name: 'UserList',
              component: UserList
            }
          ]
        },
      ]
    }
  ]
}

