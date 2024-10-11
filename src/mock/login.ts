// 模拟登录接口
export const POST = (req: any) => {
  const { username, password } = req.body;
  return new Promise((resolve) => {
    let data;
    if (username === 'admin' && password === 'admin') {
      data = {
        code: 0,
        message: '登录成功',
        data: {
          username: 'admin',
          role: 'admin',
          permissions: ['ADD', 'EDIT', 'DELETE'],
          token: 'Bearer oa12_djoa1',
        },
      };
    } else {
      data = {
        code: 1,
        message: '登录失败！请重新检查账号或密码是否正确',
      };
    }
    setTimeout(() => resolve(data), 1000);
  });
};

export const GET = () => {
  return {
    code: 0,
    message: '成功',
  };
};