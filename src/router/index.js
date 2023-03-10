import HomePage from "@/pages/HomePage.vue";
import ThreadShowPage from "@/pages/ThreadShowPage.vue";
import ThreadCreatePage from "@/pages/ThreadCreatePage.vue";
import ThreadEditPage from "@/pages/ThreadEditPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ForumPage from "@/pages/ForumPage.vue";
import CategoryPage from "@/pages/CategoryPage.vue";
import {createRouter, createWebHistory} from 'vue-router'
import sourceData from '@/data.json'
import ProfilePage from "@/pages/ProfilePage.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/me',
        name: 'Profile',
        component: ProfilePage,
        meta: {toTop: true, smoothScroll: true}
    },
    {
        path: '/me/edit',
        name: 'ProfileEdit',
        component: ProfilePage,
        props: {edit: true}
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: CategoryPage,
        props: true
    },
    {
        path: '/forum/:id',
        name: 'Forum',
        component: ForumPage,
        props: true
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: ThreadShowPage,
        props: true,
        beforeEnter(to, from, next) {
            // check if thread exits
            const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
            // if exists continue
            if (threadExists) {
                return next()
            } else {
                next({
                    name: 'NotFound',
                    params: { pathMatch: to.path.substring(1).split('/')},
                    // preserve existing query and hash
                    query: to.query,
                    hash: to.hash
                })
            }
            // if doesnt exist redirect to not found
        }
    },
    {
        path: '/forum/:forumId/thread/create',
        name: 'ThreadCreate',
        component: ThreadCreatePage,
        props: true
    },
    {
        path: '/thread/:id/edit',
        name: 'ThreadEdit',
        component: ThreadEditPage,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        const scroll = {}
        if (to.meta.toTop) scroll.top = 0
        if (to.meta.smoothScroll) scroll.behavior = 'smooth'
        return scroll
    }
})
