export interface router {
    path: string;
    key: string;
    component: any;
    exact?: boolean;
    icon?: string;
}
