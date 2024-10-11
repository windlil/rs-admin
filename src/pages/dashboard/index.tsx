import request from '@/request';
import { useCallback } from 'react';

const Dashboard = () => {

  const get = useCallback(async () => {
    const response = await request.get({
      url: '/posts/1'
    });
    console.log(response);
  }, []);

  return <div>
    <button onClick={get}>GET</button>
  </div>;
};

export default Dashboard;