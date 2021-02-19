import { GroupStates } from '../enums/groupStates.enum';
import { MemberStates } from '../enums/memberStates.enum';

export const userHasGroupMembership = (user) => {
  return user && user.groups && user.groups.length > 0
    ? user.groups.filter(
        (g) =>
          g.state === GroupStates.ACTIVE &&
          (g.member.state === MemberStates.APPROVED ||
            g.member.state === MemberStates.REQUESTED)
      ).length > 0
    : false;
};

export const userHasGroupAdministration = (user) => {
  return user && user.groups && user.groups.length > 0
    ? user.groups.filter(
        (g) =>
          g.state === GroupStates.ACTIVE &&
          g.member.state === MemberStates.APPROVED &&
          g.member.role === 'admin'
      ).length > 0
    : false;
};

export const userPreferredKitbagId = (user) => {
  return user &&
    user.kitbags &&
    user.kitbags.length > 0 &&
    user.kitbags.filter((k) => k.preferred).length > 0
    ? user.kitbags.find((a) => a.preferred)._id
    : null;
};
