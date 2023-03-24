import Home from '../pages/Home'
import Profile from '../pages/Profile'

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
    }
];

export default routes