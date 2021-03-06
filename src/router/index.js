import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import vuefire from 'vuefire'


import Login from '@/components/Login'
import SignUp from '@/components/signup'
import profile from '@/components/profile'
import Client from '@/components/client-intro'
import NewProtest from '@/components/new_protest'
import OrganizerIntro from '@/components/organizer_intro'
import organizerActive from '@/components/organizer_active'

// when making a new file, add it to the routers by saying import [nameOfComponent] from '@/components/[name of file]'

Vue.use(Router)

let router = new Router({
  routes: [


    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {

      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: profile,
      meta: {

      }
    },
    {
      path: '/client',
      name: 'Root - find ',
      component: Client,
      meta: {

      }
    },

    {
      path: '/new_protest',
      name: 'newProtest',
      component: NewProtest
    },

    {
      path: '/organizer_intro',
      name: 'organizerIntro',
      component: OrganizerIntro
    },

    {
      path: '/organizer_active', //*:protestId*/
      name: 'organizerActive',
      component: organizerActive,

    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let userStatus = function() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      if (snapshot.val().type == "Organizer"){
        return true;
      }
  })};

  // let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // let isOrganizer = to.matched.some(record => record.meta.isOrganizer);

  next()
})

export default router
