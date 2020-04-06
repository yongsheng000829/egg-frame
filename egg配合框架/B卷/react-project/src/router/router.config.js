import Main from '../views/Main';
import Login from '../views/user/Login';
import Register from '../views/user/Register';
import Home from '../views/Home';
import Add from '../views/Add';
import Detail from '../views/Detail';
import Statistics from '../views/Statistics';

export default [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/home/main',
                component: Main,
                meta: {
                    title: '投票'
                }
            },
            {
                path: '/home/add',
                component: Add,
                meta: {
                    title: '发起投票'
                }
            },
            {
                path: '/home/detail',
                component: Detail
            },
            {
                path: '/home/statistics',
                component: Statistics
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/',
        redirect: '/login'
    }
]