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
// import editor from "../components/backstage/editor/editor.vue"
//管理首页
import navigation from "../components/backstage/navigation/navigation.vue"
import saying from "../components/backstage/saying/saying.vue"
import editor from "../components/backstage/editor/editor.vue";
import blogManage from "../components/backstage/blog/blog.vue";
import type from "../components/backstage/type/type.vue";
import manage from "../components/backstage/manage/manage.vue";
import comment from "../components/backstage/comment/comment.vue";
import aboutManage from "../components/backstage/about/about.vue";

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
          component:navigation,
          children:[
            {
              path:"/backstage/saying",
              component:saying
            },
            {
              path:"/backstage/blog",
              component:blogManage
            },
            {
              path:"/backstage/type",
              component:type
            },
            {
              path:"/backstage/manage",
              component:manage
            },
            {
              path:"/backstage/comment",
              component:comment
            },
            {
              path:"/backstage/editor",
              component:editor
            },
            {
              path:"/backstage/about",
              component:aboutManage
            }
          ]
        }
      ]
    },
    {
      path:"/editor",
      component:editor
    }
  ]
})
