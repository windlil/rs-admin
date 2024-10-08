import { RouteObject } from 'react-router-dom';
import { createLazyElement } from './core/utils';

// 开发过程只需要关注该路由模块定义
const routes: RouteObject[] = [
  {
    path: '/',
    element: createLazyElement(import('@/pages/dashboard/index')),
  },
  {
    path: '/login',
    element: createLazyElement(import('@/pages/login/index')),
  },
  {
    path: '*',
    element: createLazyElement(import('@/pages/404/index')),
  },
];


export default routes;
