import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';

const SearchForm = ({
  search,
  callback,
  placeholderText,
  collections,
  useInstant = false
}) => {
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
      searchFor: search.searchFor,
      order: search.order,
      direction: search.direction
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
    const { by, searchFor, order, direction } = values;
    callback({
      by,
      searchFor,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction
    });
  }

  function instantSearchBy(event) {
    const { searchFor, order, direction } = values;
    handleChange(event);
    const { value } = event.target;
    callback({
      by: value,
      searchFor,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction
    });
  }

  function instantSearchFor(event) {
    const { by, order, direction } = values;
    handleChange(event);
    const { value } = event.target;
    callback({
      by,
      searchFor: value,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction
    });
  }

  function noAction(event) {
    event.stopPropagation();
  }

  function clearSearch() {
    setValues({ by: '', searchFor: '', order: 'updatedAt', direction: -1 });
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
              onBlur={(e) => noAction(e)}
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
                name="searchFor"
                onChange={(e) => instantSearchFor(e)}
                onBlur={(e) => instantSearchFor(e)}
                value={values.searchFor}
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
          ) : useInstant ? (
            <input
              name="searchFor"
              className="input"
              type="text"
              onChange={(e) => instantSearchFor(e)}
              onBlur={(e) => instantSearchFor(e)}
              value={values.searchFor}
              id="searchFor"
              placeholder={placeholderText}
            />
          ) : (
            <input
              name="searchFor"
              className="input"
              type="text"
              onChange={handleChange}
              value={values.searchFor}
              id="searchFor"
              placeholder={placeholderText}
            />
          )}
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
            onClick={clearSearch}
            title="Reset search"
          >
            <i className="fas fa-undo-alt"></i>
          </button>
        </p>
      </div>
    </form>
  );
};

export default SearchForm;
