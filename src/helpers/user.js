export const userHasGroupMembership = user => {
  return user.profile && user.profile.groups && user.profile.groups.length > 0
    ? user.profile.groups.filter(
        g =>
          g.status === 'approved' &&
          (g.member.state === 'approved' || g.member.state === 'requested')
      ).length > 0
    : false;
};

export const userPreferredAccountId = user => {
  return user.profile &&
    user.profile.accounts &&
    user.profile.accounts.length > 0
    ? user.profile.accounts.find(a => a.preferred)._id
    : null;
};
