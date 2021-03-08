const Role = {
  Admin: 0,
  Worker: 1,
  Customer: 2,
};

export function getRoleByName(roleName) {
  return Role[roleName];
}
