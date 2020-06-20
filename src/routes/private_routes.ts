import { router } from "./route.interface";

// components
import { Login } from "ui/pages/login";

export const PublicComponent: router[] = [
    {
        path: '/login',
        key: 'loginurl',
        component: Login
    },
]
