import UserList from '../views/user/UserList';
import AddUser from '../views/user/AddUser';
import RoleList from '../views/role/RoleList';
import AddRole from '../views/role/AddRole';
import Main from '../views/Main';
import Login from '../views/Login';
import Work from '../views/Work';
import Bbl from '../views/bbl';
import Bbl2 from '../views/Bbl2';

export default [
    {
        path: '/main',
        component: Main,
        children: [
            {
                path: '/main/work',
                component: Work
            },
            {
                path: '/main/userlist',
                component: UserList
            },
            {
                path: '/main/adduser',
                component: AddUser
            },
            {
                path: '/main/rolelist',
                component: RoleList
            },
            {
                path: '/main/addrole',
                component: AddRole
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/bbl',
        component: Bbl
    },
    {
        path: '/bbl2',
        component: Bbl2
    },
    {
        path: '/',
        redirect: '/main'
    }
]