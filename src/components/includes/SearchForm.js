import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';

const SearchForm = ({ search, callback, placeholderText, collections }) => {
  const filter = useSelector((state) => state.filter);
  const pagination = useSelector((state) => state.pagination);
  const [isClearing, setIsClearing] = useState(false);
  const [useCollection, setUseCollection] = useState(false);
  const [collection, setCollection] = useState([]);

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

  useEffect(() => {
    if (collections) {
      setUseCollection(collections[values.by] ? true : false);
      if (collections[values.by]) {
        setCollection(collections[values.by]);
      }
    }
  }, [values, collections, setUseCollection, setCollection]);

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

  function instantSearchBy(event) {
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

  function instantSearchFor(event) {
    const { by, order, direction } = values;
    handleChange(event);
    const { value } = event.target;
    callback({
      by,
      searchfor: value,
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
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              name="by"
              onChange={(e) => instantSearchBy(e)}
              onBlur={(e) => instantSearchBy(e)}
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
          </span>
        </p>
        <p className="control">
          {useCollection ? (
            <span className="select">
              <select
                name="searchfor"
                onChange={(e) => instantSearchFor(e)}
                onBlur={(e) => instantSearchFor(e)}
                value={values.searchfor}
                arialabel={`Search by ${values.by}`}
              >
                {collection.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </span>
          ) : (
            <input
              name="searchfor"
              className="input"
              type="text"
              onChange={handleChange}
              value={values.searchfor}
              id="searchfor"
              arialabel="Search by text"
              placeholder={placeholderText}
            />
          )}
        </p>
        <p className="control">
          <button className="button is-primary" type="submit">
            Search
          </button>
        </p>
        <p className="control">
          <button className="button" type="button" onClick={clearSearch}>
            Clear
          </button>
        </p>
      </div>
    </form>
  );
};

export default SearchForm;
