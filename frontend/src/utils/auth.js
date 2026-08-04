export const getRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || null;
};

export const hasAnyRole = (...roles) => {
  const role = getRole();

  if (!role) return false;

  return roles.includes(role);
};