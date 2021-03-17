import className from 'classnames';

const useCardRowClasses = ({ isCard = true }) => {
  const wrapperClassNames = className({
    'column is-12-mobile is-4-tablet is-3-desktop is-2-fullhd': isCard,
  });

  const clickAreaClassNames = className('is-clickable', {
    card: isCard,
    'is-flex has-background-light mb-2': !isCard,
  });

  const imageClassNames = className({
    'card-image': isCard,
    'is-flex-shrink-0 is-flex-grow-0 row-image': !isCard,
  });

  const figureClassNames = className('image', {
    'is-4by3': isCard,
    'is-extralarge': !isCard,
  });

  const contentClassNames = className({
    'card-content': isCard,
    'is-flex-shrink-1 is-flex-grow-1 is-flex is-flex-direction-column has-text-black has-truncated': !isCard,
  });

  const titleClassNames = className({
    'title is-size-5': isCard,
    'is-truncated-text has-text-weight-medium is-size-4 mx-3 mt-2': !isCard,
  });

  const subtitleClassNames = className({
    'subtitle is-size-6': isCard,
    'is-truncated-text is-size-5 mx-3': !isCard,
  });

  const tagsClassNames = className('tags', {
    'm-0': isCard,
    'mx-3 mt-2 mb-0': !isCard,
  });

  return {
    wrapperClassNames,
    clickAreaClassNames,
    imageClassNames,
    figureClassNames,
    contentClassNames,
    titleClassNames,
    subtitleClassNames,
    tagsClassNames,
  };
};

export default useCardRowClasses;
