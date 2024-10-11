import { Button, Form, Input, message, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, GithubFilled } from '@ant-design/icons';
import styles from './index.module.less';
import LoginSvg from '@/assets/login.svg';
import request from '@/request';
import { useState } from 'react';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);

  const login = (values: {username: string, password: string}) => {
    setSpinning(true);
    request.post<{
      code: number
      message: string
    }>({
      url: '/api/login',
      data: {
        ...values,
      }
    }).then(res => {
      setSpinning(false);
      if (res?.code === 0) {
        messageApi.success(res?.message);
      } else {
        messageApi.error(res?.message);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} tip={'加载中'} fullscreen />
      <div className='w-full h-full flex justify-center items-center bg-[#1b1b1e]'>
        <div className={`${styles.login} bg-[#131417] relative w-[72%] h-[80%] min-h-[600px] overflow-hidden flex rounded-xl`}>
          <div className='flex-1 flex justify-center items-center'>
            <img src={LoginSvg} className={`${styles.moveRight} w-[65%] h-[65%]`} />
          </div>
          <div className={`${styles.moveLeft} w-[45%] p-20 pt-40`}>
            <div className='text-gray-300 text-3xl text-center mb-6'>
              <p>欢迎使用</p>
              <p className='mt-4 first-line:text-2xl font-bold text-[#3166d4]'>
                <i>RsAdmin</i>
              </p>
            </div>
            <Form onFinish={login}>
              <Form.Item
                name='username'
                rules={[{required: true, message: '请输入账号'}, {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '账号必须是5到20位的大小写英文数字'}]}
              >
                <Input prefix={<UserOutlined />} size='large' placeholder='账号: admin'
                ></Input>
              </Form.Item>
              <Form.Item 
                name='password'
                rules={[{required: true, message: '请输入密码'}, {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5到20位的大小写英文数字'}]}
              >
                <Input prefix={<LockOutlined />} size='large' placeholder='密码: admin'></Input>
              </Form.Item>
              <div className='flex justify-between items-center mb-4'>
                <Checkbox checked={autoLogin}>自动登录</Checkbox>
                <Button type='link'>忘记密码？</Button>
              </div>
              <Button htmlType='submit' type='primary' size='large' className='w-full'>登录</Button>
            </Form>
          </div>
          <div className='absolute top-4 right-4'>
            <GithubFilled className='dark:text-white text-2xl' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
