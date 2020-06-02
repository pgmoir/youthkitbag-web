import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';

const SearchForm = ({ search, callback, placeholderText, containers }) => {
  const filter = useSelector((state) => state.filter);
  const pagination = useSelector((state) => state.pagination);
  const [isClearing, setIsClearing] = useState(false);

  const { setValues, handleChange, handleSubmit, values } = useForm(
    search,
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
      by: search.by,
      searchfor: search.searchfor,
      order: search.order,
      direction: search.direction,
    });
  }, [search, setValues]);

  function searchItems() {
    const { by, searchfor, order, direction } = values;
    callback({
      by,
      searchfor,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction,
    });
  }

  function instantSearch(event) {
    const { searchfor, order, direction } = values;
    handleChange(event);
    const { value } = event.target;
    callback({
      by: value,
      searchfor,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction,
    });
  }

  function clearSearch() {
    setValues({ by: '', searchfor: '', order: 'updatedAt', direction: -1 });
    setIsClearing(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <select
                name="by"
                className="custom-select"
                onChange={(e) => instantSearch(e)}
                onBlur={(e) => instantSearch(e)}
                value={values.by}
              >
                {filter.options.map((o) => (
                  <option
                    key={o.key}
                    value={o.key}
                    defaultValue={o.key === values.by ? 'true' : ''}
                  >
                    {o.value}
                  </option>
                ))}
              </select>
            </div>
            {values.by === 'container' && (
              <select
                className="custom-select"
                name="searchfor"
                onChange={handleChange}
                onBlur={handleChange}
                value={values.searchfor}
                arialabel="Search by container"
              >
                {containers.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
            {values.by !== 'container' && (
              <input
                name="searchfor"
                className="form-control"
                type="text"
                onChange={handleChange}
                value={values.searchfor}
                id="searchfor"
                arialabel="Search by text"
                placeholder={placeholderText}
              />
            )}
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={clearSearch}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
