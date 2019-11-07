import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'views/rank/rank'
import Search from 'views/search/search'
import Singer from 'views/singer/singer'
import Recomment from 'views/recomment/recomment'
import SingerDeatil from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recomment
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
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
