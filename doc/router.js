/*
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:32
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 11:00:38
 * @Descripttion:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Start from './views/Start.vue'

Vue.use(VueRouter)

export const routes = [
  { path: '/', name: '快速上手', component: Home },
  { path: '/start', name: '使用文档', component: Start },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({ routes })

export default router
