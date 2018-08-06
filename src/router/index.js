import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Create from '@/components/Create'
import Query from '@/components/Query'
import TaskList from '@/components/TaskList'
import TaskListForEnd from '@/components/TaskListForEnd'
import Node from '@/components/Node'
import UserManager from '@/components/UserManager'
import ReportCreate from '@/components/ReportCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Create',
          name: 'Create',
          component: Create
        },
        {
          path: '/TaskList',
          name: 'TaskList',
          component: TaskList
        },
        {
          path: '/TaskListForEnd',
          name: 'TaskListForEnd',
          component: TaskListForEnd
        },
        {
          path: '/Query',
          name: 'Query',
          component: Query
        },
        {
          path: '/Node',
          name: 'Node',
          component: Node
        },
        {
          path: '/UserManager',
          name: 'UserManager',
          component: UserManager
        },
        {
          path: '/ReportCreate',
          name: 'ReportCreate',
          component: ReportCreate
        }
      ]
    }
  ]
})
