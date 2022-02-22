import { createRouter, createWebHistory  } from 'vue-router';



import TeamsList from './Pages/teams/TeamsList.vue';
import UsersList from './Pages/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue'; 
import NotFound from './Pages/nav/NotFound.vue';
import TeamsFooter from './Pages/teams/TeamsFooter.vue';
import UsersFooter from './Pages/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        { 
        name: 'tams',
        path: '/teams',
        meta: { needsAuth: true },
         components: {default: TeamsList, footer: TeamsFooter }, 
        children:
         [
            { name: 'team-members', path: ':teamId', component: TeamMembers,props:true },
        ] },
        { path: '/users', 
        components: { default: UsersList, footer: UsersFooter
        },
        beforeEnter(to, from, next) {
            console.log('Global beforeEnter');
            console.log(to,from);
            next();

        }
     },
        
        { path: '/:notFound(.*)', component: NotFound}
   

    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
        //console.log(to, from, savedPosition);
        if(savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});


router.beforeEach(function(to, from, next) {
    console.log('Global beforeEach');
    console.log(to,from);
    if(to.meta.needsAuth) {
        console.log('needsAuth');
        next();
    }else {
        next();
    }
    // if(to.name === 'team-members') {
    //     next();
    // }else {
    // next({name: 'team-members', params: {teamId: 't2'}});
    // }
    next();
});

router.afterEach(function(to, from) {
    console.log('Global afterEach');
    console.log(to, from);
});

export default router;