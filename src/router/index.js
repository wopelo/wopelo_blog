import Vue from 'vue'
import Router from 'vue-router'

//首页
import index from "../components/client/index/index.vue"
//博客查看
import blog from "../components/client/blog/blog.vue"
//博客列表
import list from "../components/client/list/list.vue"
//博客总览
import overview from "../components/client/overview/overview.vue"
//谋篇博客详细内容
import detail from "../components/client/detail/detail.vue"
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
// import blogManage from "../components/backstage/blog/blog.vue";
import type from "../components/backstage/type/type.vue";
import manage from "../components/backstage/manage/manage.vue";
import comment from "../components/backstage/comment/comment.vue";
import aboutManage from "../components/backstage/about/about.vue";
import edBlog from "../components/backstage/edBlog/edBlog.vue";
import pandect from "../components/backstage/pandect/pandect.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:index
    },
    {
    	path:"/blog",
    	component:blog,
      children:[
        {
          path:"",
          redirect:"/list"
        },
        {
          path:"/list",
          name:"list",
          component:list,
        },
        {
          path:"/overview",
          component:overview
        },
        {
          path:"/detail",
          name:"detail",
          component:detail
        }
      ]
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
              component:pandect
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
            },
            {
              path:"/backstage/edBlog",
              name:"edBlog",
              component:edBlog
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
