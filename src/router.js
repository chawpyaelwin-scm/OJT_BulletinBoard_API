import Vue from "vue";
import Router from "vue-router";

const LogIn = () => import("@/view/LogIn");
const SignIn = () => import("@/view/SignIn");
const UserList = () => import("@/view/UserList");
const UserUpdate = () => import("@/view/UserUpdate");
const UserDetail = () => import("@/view/UserDetail");
const ChangePassword = () => import("@/view/ChangePassword");
const AllPost = () => import("@/view/PostList");
const PostCreate = () => import("@/view/PostCreate");
const PostUpdate = () => import("@/view/PostUpdate");
const PostUpload = () => import("@/view/PostUpload");
Vue.use(Router);

const user = localStorage.getItem("user");
const role = localStorage.getItem("role");

export const router = new Router({
    mode: "hash", 
    linkActiveClass: "open active",
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "/",
            name: "",
            redirect: () => {
            if (user && role) {
                return "/post/postlist"
              } else {
                return "/LogIn";
              }
            },
            component: {
                render(c) {
                    return c("router-view");
                }
            },
            children: [
                {
                    path: "/LogIn",
                    name: "User LogIn",
                    component: LogIn,
                    meta: { requiresAuth: false }
                },
            ]
        },
        {
            path: "/",
            redirect: "/post",
            name: "Post",
            component: {
              render(c) {
                  return c("router-view");
              }
            },
            children: [       
              {
                path: "/post/postlist",
                name: "Post List",
                component: AllPost,
                meta: { requiresAuth: true }
              },
              {
                path: "/post/create",
                name: "Add Post",
                component: PostCreate,
                meta: { requiresAuth: true }
              },
              {
                path: "/post/update/:id",
                name: "Update Post",
                component: PostUpdate,
                meta: { requiresAuth: true }
              },
              {
                path: "/post/upload",
                name: "Upload Post",
                component: PostUpload,
                meta: { requiresAuth: true }
              },
            ]
        },
        {
          path: "/user",
          redirect: "/user/userlist",
          name: "User",
          component: {
              render(c) {
                  return c("router-view");
              }
          },
          children: [       
            {
              path: "/user/userlist",
              name: "User List",
              component: UserList,
              meta: { requiresAuth: true }
            },
            {
              path: "/user/signin",
              name: "Add User",
              component: SignIn,
              meta: { requiresAuth: true }
            },
            {
              path: "/user/update/:id",
              name: "Update User",
              component: UserUpdate,
              meta: { requiresAuth: true }
            },
            {
              path: "/user/detail/:id",
              name: "Detail User",
              component: UserDetail,
              meta: { requiresAuth: true }
            },
            {
              path: "/user/changepassword",
              name: "Update User Password",
              component: ChangePassword,
              meta: { requiresAuth: true }
            },
          ]
      },
    ],
});


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");    
    const user = localStorage.getItem("user");
    if(to.matched.some(record => record.meta.requiresAuth)){
      if (token && user) {
        next();
        return
      }
      next("/login");
    }
    else {
      if (token && user) {
        next();
        return
      }
      next();
    }
  });