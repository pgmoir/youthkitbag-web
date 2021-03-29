export const hasFilter = (filter) => {
  if (filter.active === false) return true;
  if (filter.exactSearchFor) return true;
  if (filter.onlyTitle) return true;
  if (filter.activitys.length > 0) return true;
  if (filter.tags.length > 0) return true;
  if (filter.container) return true;
  if (filter.source) return true;
  return false;
};

export const getFilterBy = (searchFor, by) => {
  switch (by) {
    case 'tag': {
      return { ...DefaultFilter, tags: [searchFor] };
    }
    case 'activity': {
      return { ...DefaultFilter, activitys: [searchFor] };
    }
    case 'container': {
      return { ...DefaultFilter, container: searchFor };
    }
    case 'source': {
      return { ...DefaultFilter, source: searchFor };
    }
    default:
      return { ...DefaultFilter };
  }
};

export const DefaultFilter = {
  active: true,
  searchFor: '',
  exactSearchFor: false,
  onlyTitle: false,
  activitys: [],
  allActivitys: false,
  tags: [],
  allTags: false,
  container: '',
  exactContainer: true,
  source: '',
  exactSource: true,
  page: 1,
  pagesize: 24,
  order: 'updatedAt',
  direction: -1,
  loading: true,
};
