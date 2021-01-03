export const userHasGroupMembership = (user) => {
  return user.profile && user.profile.groups && user.profile.groups.length > 0
    ? user.profile.groups.filter(
        (g) =>
          g.status === 'approved' &&
          (g.member.state === 'approved' || g.member.state === 'requested')
      ).length > 0
    : false;
};

export const userHasGroupAdministration = (user) => {
  return user.profile && user.profile.groups && user.profile.groups.length > 0
    ? user.profile.groups.filter(
        (g) =>
          g.status === 'approved' &&
          g.member.state === 'approved' &&
          g.member.roles.includes('admin')
      ).length > 0
    : false;
};

export const userPreferredKitbagId = (user) => {
  return user.profile && user.profile.kitbags && user.profile.kitbags.length > 0
    ? user.profile.kitbags.find((a) => a.preferred)._id
    : null;
};
