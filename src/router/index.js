import Vue from 'vue'
import Router from 'vue-router'

//首页
import index from "../components/client/index/index.vue"
//博客列表
import blog from "../components/client/blog/blog.vue"
//关于wopelo
import about from "../components/client/about/about.vue"
//后台管理
import backstage from "../components/backstage/index/index.vue"
//身份验证
import auth from "../components/backstage/auth/auth.vue"
//编辑器
import editor from "../components/backstage/editor/editor.vue"
//管理首页
import navigation from "../components/backstage/navigation/navigation.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:index
    },
    {
    	path:"/blog",
    	component:blog
    },
    {
    	path:"/about",
    	component:about
    },
    {
      path:"/backstage",
      component:backstage,
      children:[
        {
          path:"",
          component:auth
        },
        {
          path:"index",
          component:navigation
        }
      ]
    },
    {
      path:"/editor",
      component:editor
    }
  ]
})
