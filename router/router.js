import Main from '../views/Main.vue';


export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: 'Страница не найдена'
    },
    component: resolve => {
        require(['../views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: 'Доступ запрещен'
    },
    name: 'error-403',
    component: resolve => {
        require(['../views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: 'Ошибка сервера'
    },
    name: 'error-500',
    component: resolve => {
        require(['../views/error-page/500.vue'], resolve);
    }
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: 'Главная',
            name: 'home_index',
            component: resolve => {
                require(['../views/home/home.vue'], resolve);
            }
        },
        {
            path: 'course/:id',
            icon: 'pound',
            name: 'course_update',
            title: 'Редактирование курса',
            component: resolve => {
                require(['../views/courses/course_update.vue'], resolve);
            }
        },
        {
            path: 'post/:id',
            icon: 'compose',
            name: 'post_update',
            title: 'Редактирование статьи',
            component: resolve => {
                require(['../views/blog/post_update.vue'], resolve);
            }
        },
        {
            path: 'user/:id',
            icon: 'pound',
            name: 'user_update',
            title: 'Редактирование пользователя',
            component: resolve => {
                require(['../views/users/user_update.vue'], resolve);
            }
        },
        {
            path: 'event/:id',
            icon: 'pound',
            name: 'event_update',
            title: 'Редактирование события',
            component: resolve => {
                require(['../views/events/event_update.vue'], resolve);
            }
        },
        {
            path: 'roles-update/:id',
            title: 'Привилегии',
            name: 'roles_update',
            component: resolve => {
                require(['../views/roles/roles_update.vue'], resolve);
            }
        },
        {
            path: 'widget-update/:id',
            title: 'Редактирование виджета',
            name: 'widget_update',
            component: resolve => {
                require(['../views/widgets/widget_edit.vue'], resolve);
            }
        },
        {
            path: 'partner-update/:id',
            title: 'Редактирование Партнера',
            name: 'partner_update',
            component: resolve => {
                require(['../views/partners/partner_update.vue'], resolve);
            }
        },
        {
            path: 'update-photo-gallery/:id',
            icon: 'compose',
            name: 'update_photo_gallery',
            title: 'Редактировать фото галерею',
            component: resolve => {
                require(['../views/gallery/update_photo_gallery.vue'], resolve);
            },
        },
        {
            path: 'update-video-gallery/:id',
            icon: 'compose',
            name: 'update_video_gallery',
            title: 'Редактировать видео галерею',
            component: resolve => {
                require(['../views/gallery/update_video_gallery.vue'], resolve);
            },
        }
    ]
};

export const appRouter = [
    {
        path: '/blog',
        icon: 'ios-paper-outline',
        name: 'blog',
        title: 'Блог',
        component: Main,
        children: [
            {
                path: 'new-post',
                icon: 'ios-compose-outline',
                name: 'new-post',
                title: 'Новая статья',
                component: resolve => {
                    require(['../views/blog/post_create.vue'], resolve);
                }
            },
            {
                path: 'posts',
                icon: 'ios-paper-outline',
                name: 'posts',
                title: 'Все статьи',
                component: resolve => {
                    require(['../views/blog/post_list.vue'], resolve);
                }
            },
            {
                path: 'categories',
                icon: 'ios-pricetag-outline',
                name: 'categories',
                title: 'Категории',
                component: resolve => {
                    require(['../views/blog/categories.vue'], resolve);
                }
            },
            {
                path: 'tags',
                icon: 'pound',
                name: 'tags',
                title: 'Теги',
                component: resolve => {
                    require(['../views/blog/tags.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/all-courses',
        icon: 'ios-book-outline',
        name: 'all-courses',
        title: 'Курсы',
        component: Main,
        children: [
            {
                path: 'courses',
                icon: 'ios-book-outline',
                name: 'courses',
                title: 'Курсы',
                component: resolve => {
                    require(['../views/courses/courses.vue'], resolve);
                }
            },
            {
                path: 'course-create',
                icon: 'ios-compose-outline',
                name: 'course_create',
                title: 'Создание курса',
                component: resolve => {
                    require(['../views/courses/course_create.vue'], resolve);
                }
            },
            {
                path: 'categories-course',
                icon: 'ios-pricetag-outline',
                name: 'categories_course',
                title: 'Категории',
                component: resolve => {
                    require(['../views/courses/categories.vue'], resolve);
                }
            },
        ]
    },

    {
        path: '/all-events',
        icon: 'ios-location-outline',
        name: 'all-events',
        title: 'События',
        component: Main,
        children: [
            {
                path: 'events',
                icon: 'ios-location-outline',
                name: 'events',
                title: 'События',
                component: resolve => {
                    require(['../views/events/events.vue'], resolve);
                }
            },
            {
                path: 'event-create',
                icon: 'ios-compose-outline',
                name: 'event_create',
                title: 'Создание события',
                component: resolve => {
                    require(['../views/events/event_create.vue'], resolve);
                }
            },
            {
                path: 'categories-event',
                icon: 'ios-pricetag-outline',
                name: 'categories_event',
                title: 'Категории',
                component: resolve => {
                    require(['../views/events/categories.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/gallery',
        icon: 'ios-photos-outline',
        name: 'gallery',
        title: 'Галереи',
        component: Main,
        children: [
            {
                path: 'create_photo_gallery',
                icon: 'ios-camera-outline',
                name: 'create_photo_gallery',
                title: 'Создать новую галерею',
                component: resolve => {
                    require(['../views/gallery/create_photo_gallery.vue'], resolve);
                },
            },
            {
                path: 'create_video_gallery',
                icon: 'ios-videocam-outline',
                name: 'create_video_gallery',
                title: 'Создать видео галерею',
                component: resolve => {
                    require(['../views/gallery/create_video_gallery.vue'], resolve);
                },
            },
            {
                path: 'galleries',
                icon: 'ios-camera',
                name: 'galleries',
                title: 'Галереи',
                component: resolve => {
                    require(['../views/gallery/galleries.vue'], resolve);
                },
            },
            {
                path: 'categories_gallery',
                icon: 'ios-pricetag-outline',
                name: 'categories_gallery',
                title: 'Категории',
                component: resolve => {
                    require(['../views/gallery/categories.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/all-partners',
        icon: 'ios-person',
        name: 'all-partners',
        title: 'Партнеры',
        component: Main,
        children: [
            {
                path: 'partners',
                icon: 'ios-book-outline',
                name: 'partners',
                title: 'Партнеры',
                component: resolve => {
                    require(['../views/partners/partners.vue'], resolve);
                }
            },
            {
                path: 'partner-create',
                icon: 'ios-compose-outline',
                name: 'partner_create',
                title: 'Добавить партнера',
                component: resolve => {
                    require(['../views/partners/partner_create.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/all-widgets',
        icon: 'calendar',
        name: 'all-widgets',
        title: 'Виджеты',
        component: Main,
        children: [
            {
                path: 'widgets',
                icon: 'calendar',
                name: 'widgets',
                title: 'Виджеты',
                component: resolve => {
                    require(['../views/widgets/widgets.vue'], resolve);
                }
            },
            {
                path: 'widget-create',
                icon: 'ios-plus-empty',
                name: 'widget',
                title: 'Добавить виджет',
                component: resolve => {
                    require(['../views/widgets/widget_create.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/settings',
        icon: 'ios-settings',
        name: 'settings',
        title: 'Настройки',
        component: Main,
        children: [
            {
                path: '/roles',
                icon: 'ios-people-outline',
                name: 'roles',
                title: 'Роли пользователей',
                component: resolve => {
                    require(['../views/roles/roles.vue'], resolve);
                },
            },
            {
                path: 'users',
                icon: 'ios-person-outline',
                name: 'users',
                title: 'Пользователи сайта',
                component: resolve => {
                    require(['../views/users/users.vue'], resolve);
                }
            }
        ]
    },
   
    {
        path: '/templates',
        icon: 'key',
        name: 'templates',
        title: 'Шаблоны',
        component: Main,
        children: [
            {
                path: '/filemanager',
                icon: 'key',
                name: 'filemanager',
                title: 'Файлы',
                component: resolve => {
                    require(['../views/files/files.vue'], resolve);
                }
            },
            {
                path: 'ownspace',
                title: 'Личная информация',
                icon: 'person',
                name: 'ownspace_index',
                component: resolve => {
                    require(['../views/own-space/own-space.vue'], resolve);
                }
            },
            {
                path: 'notifications',
                title: 'Уведомления',
                name: 'notifications',
                icon:'android-notifications',
                component: resolve => {
                    require(['../views/notifications/notifications.vue'], resolve);
                }   
            },
            {
                path: 'notifications_settings',
                title: 'Настройки уведомлений',
                icon:'android-notifications-off',
                name: 'notifications_settings',
                component: resolve => {
                    require(['../views/notifications/notification_settings.vue'], resolve);
                }
            },
            {
                path: 'menu-settings',
                title: 'Меню',
                icon:'navicon-round',
                name: 'menu_settings',
                component: resolve => {
                    require(['../views/settings/menu.vue'], resolve);
                }
            }
        ]
    },
];

export const routers = [
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
