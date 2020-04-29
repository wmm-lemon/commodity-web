import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
// import CreateCode from '@/components/layout/CreateCode'
// import GetVersion from '@/components/layout/GetVersion'
// import SetVersion from '@/components/layout/SetVersion'
import ListPerson from '@/components/layout/ListPerson'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      name:'Login',
      component: Login
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      meta: {
        requireAuth:true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: HelloWorld,
      children:[
        // {
        //   path: '/createCode',
        //   name: 'CreateCode',
        //   component: CreateCode
        // },
        // {
        //   path: '/getVersion',
        //   name: 'GetVersion',
        //   component: GetVersion
        // },
        // {
        //   path: '/setVersion',
        //   name: 'SetVersion',
        //   component: SetVersion
        // },
        {
          path: '/listPerson',
          name: 'ListPerson',
          component: ListPerson
        }
      ]
    }
  ]
});

export default router;
