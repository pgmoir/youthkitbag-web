export const userHasGroupMembership = (user) => {
  return user && user.groups && user.groups.length > 0
    ? user.groups.filter(
        (g) =>
          g.state === 'approved' &&
          (g.member.state === 'approved' || g.member.state === 'requested')
      ).length > 0
    : false;
};

export const userHasGroupAdministration = (user) => {
  return user && user.groups && user.groups.length > 0
    ? user.groups.filter(
        (g) =>
          g.state === 'approved' &&
          g.member.state === 'approved' &&
          g.member.roles.includes('admin')
      ).length > 0
    : false;
};

export const userPreferredKitbagId = (user) => {
  return user && user.kitbags && user.kitbags.length > 0
    ? user.kitbags.find((a) => a.preferred)._id
    : null;
};
