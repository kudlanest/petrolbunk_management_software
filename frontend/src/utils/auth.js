export const getRole = () => {
  return localStorage.getItem("role");
};

export const hasAnyRole = (...roles) => {
  const role = getRole();
  return roles.includes(role);
};