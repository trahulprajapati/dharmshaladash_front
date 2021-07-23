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
const Profile = () => import('@/views/dharmashala/user/Profile')

// Donation
const DonationAdd = () => import('@/views/dharmashala/donation/Add')
const DonationList = () => import('@/views/dharmashala/donation/List')
const DonationUpdate  = () => import('@/views/dharmashala/donation/Update')

// Expense
const ExpenseAdd = () => import('@/views/dharmashala/expense/Add')
const ExpenseList = () => import('@/views/dharmashala/expense/List')
const ExpenseUpdate  = () => import('@/views/dharmashala/expense/Update')

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
          path: 'profile',
          name: 'Profile',
          component: Profile
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
            },
          ]
        },
        {
          path: 'expense',
          redirect: '/dharmashala/expense',
          name: 'Dharmashala',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/dharmashala/expense/add',
              name: 'Expense Add',
              component: ExpenseAdd
            },
            {
              path: '/dharmashala/expense/list',
              name: 'Expense List',
              component: ExpenseList
            },
            {
              path: '/dharmashala/expense/get/:id',
              name: 'Expense Update',
              component: ExpenseUpdate
            }
          ]
        },
        {
          path: 'donation',
          redirect: '/dharmashala/donation',
          name: 'Dharmashala',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/dharmashala/donation/add',
              name: 'Donation Add',
              component: DonationAdd
            },
            {
              path: '/dharmashala/donation/list',
              name: 'Donation List',
              component: DonationList
            },
            {
              path: '/dharmashala/donation/get/:id',
              name: 'Donation Update',
              component: DonationUpdate
            }
          ]
        },
      ]
    }
  ]
}

