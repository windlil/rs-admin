import { FC, memo, ReactNode } from 'react';
import { inspectPermission } from '@/utils/inspectPermission';

const AuthContainer: FC<{
  children: ReactNode;
  current: string | string[];
  permissions: string | string[];
}> = memo((props) => {
  const { children, current, permissions } = props;
  if (inspectPermission(permissions, current)) {
    return children;
  } else {
    return null;
  }
});

export default AuthContainer;
