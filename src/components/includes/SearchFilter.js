import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import validate from './FormEmptyValidationRules';
import KitbagKitFilter from './KitbagKitFilter';

const SearchFilter = ({
  search,
  callback,
  callbackFilter,
  placeholderText,
  collections,
  useInstant = false,
}) => {
  const pagination = useSelector((state) => state.pagination);

  const [showFilter, setShowFilter] = useState(false);
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

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  function clearSearch() {
    setValues({ by: '', searchfor: '', order: 'updatedAt', direction: -1 });
    setIsClearing(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons mb-3">
          <p className="control">
            <button
              className="button is-primary"
              type="button"
              title="Search"
              onClick={toggleFilter}
            >
              <i className="fas fa-filter"></i>
            </button>
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
            ) : useInstant ? (
              <input
                name="searchfor"
                className="input"
                type="text"
                onChange={(e) => instantSearchFor(e)}
                onBlur={(e) => instantSearchFor(e)}
                value={values.searchfor}
                id="searchfor"
                arialabel="Search by text"
                placeholder={placeholderText}
              />
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
      {showFilter && (
        <div className="box">
          <KitbagKitFilter
            toggleFilter={toggleFilter}
            callback={callbackFilter}
          />
        </div>
      )}
    </>
  );
};

export default SearchFilter;
