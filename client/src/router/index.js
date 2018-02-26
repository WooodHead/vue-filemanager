import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Register from '@/components/Register';
import Songs from '@/components/Songs';
import CreateSong from '@/components/CreateSong';
import Repos from '@/components/Repos';
import Manager from '@/components/main';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    }, {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/repos',
      name: 'repos',
      component: Repos
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager
    }
  ]
});
