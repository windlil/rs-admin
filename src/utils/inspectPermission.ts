export const inspectPermission = (permission: string | string[], current: string | string[]): boolean => {
  const permissionList = Array.isArray(permission) ? permission : [permission];
  const currentList = Array.isArray(current) ? current : [current];

  const hasPermission = permissionList.some(permission => currentList.includes(permission));

  return hasPermission;
};