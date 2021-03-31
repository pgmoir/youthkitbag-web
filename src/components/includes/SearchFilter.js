import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';
import KitbagKitFilter from './KitbagKitFilter';
import { hasFilter, DefaultFilter } from '../../utils/filter';

const SearchFilter = ({ filter, callback, placeholderText }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const { setValues, handleChange, handleSubmit, values } = useForm(
    filter,
    searchItems,
    validate
  );

  useEffect(() => {
    if (isClearing) {
      handleSubmit();
      setIsClearing(false);
    }
  }, [isClearing, handleSubmit]);

  useEffect(() => {
    setValues({
      searchFor: filter.searchFor,
      order: filter.order,
      direction: filter.direction,
    });
  }, [filter, setValues]);

  function searchItems() {
    closeFilter();
    const { searchFor } = values;
    callback({
      ...filter,
      searchFor,
    });
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  function closeFilter() {
    setShowFilter(false);
  }

  function clearFilter() {
    setValues({ ...DefaultFilter });
    setIsClearing(true);
  }

  const hasExistingFilter = hasFilter(filter);

  const filterClasses = classNames('button', {
    'is-primary': !hasExistingFilter,
    'is-warning': hasExistingFilter,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons mb-3">
          <p className="control">
            <button
              className={filterClasses}
              type="button"
              title="Search"
              onClick={toggleFilter}
            >
              <i className="fas fa-filter"></i>
            </button>
          </p>
          <p className="control">
            <input
              name="searchFor"
              className="input"
              type="text"
              onChange={handleChange}
              value={values.searchFor}
              id="searchFor"
              arialabel="Search by text"
              placeholder={placeholderText}
            />
          </p>
          <p className="control">
            <button className="button is-primary" type="submit" title="Search">
              <i className="fas fa-search"></i>
            </button>
          </p>
          <p className="control">
            <button
              className="button"
              type="button"
              onClick={() => {
                closeFilter();
                clearFilter();
              }}
              title="Reset search"
            >
              <i className="fas fa-undo-alt"></i>
            </button>
          </p>
        </div>
      </form>
      {showFilter && (
        <div className="box">
          <KitbagKitFilter toggleFilter={toggleFilter} callback={callback} />
        </div>
      )}
    </>
  );
};

export default SearchFilter;
