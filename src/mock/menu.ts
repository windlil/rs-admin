export const POST = (req: any) => {
  const { role } = req.body;
  switch (role) {
    case 'admin':
      return {
        code: 0,
        data: [],
      };
  }
};