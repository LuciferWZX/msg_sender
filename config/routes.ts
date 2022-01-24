import { IRoute } from 'umi';
const homeRoutes:IRoute[]=[
  {
    path:'/home/info',
    component:'@/pages/info'
  },{
    path:'/home/template',
    component:'@/pages/template'
  }
]
const userRoutes:IRoute[]=[
  {
    path:'/user/login',
    component:'@/pages/login'
  }
]
const routes:IRoute[]=[
  {
    path:'/',
    component:'@/layouts',
    routes:[
      {redirect:'/home',path:'/'},
      {
        path:'/home',
        component:'@/layouts/home',
        routes:[
          {redirect:'/home/info',path:'/home'},
          ...homeRoutes,
        ]
      },
      {
        path:'/user',
        component:'@/layouts/user',
        routes:[
          {redirect:'/user/login',path:'/user'},
          ...userRoutes,
        ]
      },
    ]
  }
]
export default routes
