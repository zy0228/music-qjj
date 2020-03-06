import Vue from 'vue'
import Router from 'vue-router'
const Rank = () => import('views/rank/rank')
const Search = () => import('views/search/search')
const Singer = () => import('views/singer/singer')
const Recomment = () => import('views/recomment/recomment')
const SingerDeatil = () => import('components/singer-detail/singer-detail')
const Disc = () => import('components/disc')
const TopList = () => import('components/top-list')
const UserCenter = () => import('components/user-center/user-center')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      component: UserCenter
    },
    {
      path: '/recommend',
      component: Recomment,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDeatil
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDeatil
        }
      ]
    }
  ]
})
