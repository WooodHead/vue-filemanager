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
    name: 'manager',
    component: Manager
  }]
});