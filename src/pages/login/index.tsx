import { Button, Form, Input } from 'antd';
import styles from './index.module.less';
import LoginSvg from '@/assets/login.svg';

const Login = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-[#131417]'>
      <div className={`${styles.login} w-[72%] h-[80%] flex rounded-xl`}>
        <div className='flex-1 flex justify-center items-center'>
          <img src={LoginSvg} className='w-[65%] h-[65%]' />
        </div>
        <div className='w-[45%] p-20 pt-40'>
          <div className='text-gray-300 text-3xl text-center mb-6'>
            <p>欢迎使用</p>
            <p className='mt-4 first-line:text-2xl font-bold text-[#3166d4]'>
              <i>RsAdmin</i>
            </p>
          </div>
          <Form>
            <Form.Item>
              <Input size='large' placeholder='请输入账号: admin'></Input>
            </Form.Item>
            <Form.Item>
              <Input size='large' placeholder='请输入密码: admin'></Input>
            </Form.Item>
            <Button type='primary' size='large' className='w-full'>登录</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
