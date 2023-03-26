import Home from '../pages/Home'
import Profile from '../pages/Profile'
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string,
    protected: boolean
}

const routes: RouteType[] = [
    {
        path: "",
        component: Home,
        name: "Home Screen",
        protected: false
    },
    {
        path: "/profile",
        component: Profile,
        name: "Profile",
        protected: false
    },
    {
        path: "/signup",
        component: SignUp,
        name: "Sign Up",
        protected: false
    },
    {
        path: "/login",
        component: LogIn,
        name: "Log In",
        protected: false
    }
];

export default routes