import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';
import queryString from 'query-string';

const SearchForm = ({ accountId, search, callback }) => {
  const { searchfor, by } = queryString.parse(search);

  const filter = useSelector(state => state.filter);
  const pagination = useSelector(state => state.pagination);
  const [isClearing, setIsClearing] = useState(false);

  const initialValues = {
    by: by,
    searchfor: searchfor
  };

  const { setValues, handleChange, handleSubmit, values } = useForm(
    initialValues,
    searchItems,
    validate
  );

  function searchItems() {
    const { by, searchfor } = values;
    console.log(
      'SEARCHITEMS',
      searchfor,
      by,
      1,
      pagination.itemsPerPage,
      accountId
    );
    callback(searchfor, by, 1, pagination.itemsPerPage, accountId);
  }

  function clearSearch() {
    setValues({ by: '', searchfor: '' });
    setIsClearing(true);
  }

  useEffect(() => {
    if (isClearing) {
      handleSubmit();
      setIsClearing(false);
    }
  }, [isClearing, handleSubmit]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <select
                name="by"
                className="custom-select"
                onChange={handleChange}
                onBlur={handleChange}
                value={values.by}
              >
                {filter.options.map(o => (
                  <option key={o.key} value={o.key}>
                    {o.value}
                  </option>
                ))}
              </select>
            </div>
            <input
              name="searchfor"
              className="form-control"
              type="text"
              onChange={handleChange}
              value={values.searchfor}
              id="searchfor"
              arialabel="Search by text"
            />
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
