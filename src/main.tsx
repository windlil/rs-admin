import ReactDOM from 'react-dom/client';
import router from '@/router/core/router';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { ConfigProvider, theme } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
