import React from 'react';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import CheckBoxInput from './controls/CheckBoxInput';
import DateInput from './controls/DateInput';
import SelectInput from './controls/SelectInput';
import TextInput from './controls/TextInput';
import TextListInput from './controls/TextListInput';
import validate from './FormEmptyValidationRules';

const KitbagKitFilter = ({ toggleFilter, callback }) => {
  const pagination = useSelector((state) => state.pagination);
  const lists = useSelector((state) => state.kitbag.kit.lists);
  const filter = useSelector((state) => state.kitbag.kit.filter);

  const { handleChange, setChange, handleSubmit, values, errors } = useForm(
    filter,
    searchItems,
    validate
  );

  function searchItems() {
    const { order, direction } = values;
    callback({
      ...values,
      page: 1,
      pagesize: pagination.itemsPerPage,
      order,
      direction,
    });
    toggleFilter();
  }

  const containers = ['', ...lists.container];
  const sources = ['', ...lists.source];

  return (
    <form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column is-half">
          <TextInput
            label="Text search"
            value={values.searchFor}
            field="searchFor"
            handleChange={handleChange}
            error={errors.searchFor}
          />
        </div>
        <div className="column is-one-quarter">
          <CheckBoxInput
            label="Exact search"
            value={values.exactSearchFor}
            field="exactSearchFor"
            onChange={handleChange}
            error={errors.exactSearchFor}
            help="Search for title, subtitle or description that exactly matches your search above"
          />
        </div>
        <div className="column is-one-quarter ">
          <CheckBoxInput
            label="Search only title"
            value={values.onlyTitle}
            field="onlyTitle"
            onChange={handleChange}
            error={errors.onlyTitle}
            help="Only perform the search against the title"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <TextListInput
            label="Activities"
            value={values.activitys}
            field="activitys"
            setChange={setChange}
            error={errors.activitys}
            tagClass="is-success"
            suggestions={lists.activity}
          />
        </div>
        <div className="column is-half">
          <CheckBoxInput
            label="Search all selected activitys"
            value={values.allActivitys}
            field="allActivitys"
            onChange={handleChange}
            error={errors.allActivitys}
            help="By default, the search looks for a match against any activity selected. Select this to match against all the selected activitys"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <TextListInput
            label="Tags"
            value={values.tags}
            field="tags"
            setChange={setChange}
            error={errors.tags}
            tagClass="is-warning"
            suggestions={lists.tag}
          />
        </div>
        <div className="column is-half">
          <CheckBoxInput
            label="Search all selected tags"
            value={values.allTags}
            field="allTags"
            onChange={handleChange}
            error={errors.allTags}
            help="By default, the search looks for a match against any tag selected. Select this to match against all the selected tags"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <SelectInput
            label="Storage location"
            value={values.container}
            field="container"
            handleChange={handleChange}
            error={errors.container}
            items={containers}
          />
          {/* <CheckBoxInput
        label="Search exact container name"
        value={values.exactContainer}
        field="exactContainer"
        onChange={handleChange}
        error={errors.exactContainer}
        help="By default, the search looks for an exact match on the selected container, but you can unselect to find all containers that have the selected text"
      /> */}
        </div>
        <div className="column is-half">
          <SelectInput
            label="Purchased from"
            value={values.source}
            field="source"
            handleChange={handleChange}
            error={errors.source}
            items={sources}
          />
          {/* <CheckBoxInput
        label="Search exact source name"
        value={values.exactSource}
        field="exactSource"
        onChange={handleChange}
        error={errors.exactSource}
        help="By default, the search looks for an exact match on the selected source, but you can unselect to find all sources that have the selected text"
      /> */}
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <DateInput
            label="Created after"
            value={values.createdFrom}
            field="createdFrom"
            setChange={setChange}
            placeHolder="17-Jan-2021 or -7d or leave blank"
          />
        </div>
        <div className="column is-half">
          <DateInput
            label="Created before"
            value={values.createdTo}
            field="createdTo"
            setChange={setChange}
            placeHolder="23-Mar-2021 or -7d or leave blank"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <DateInput
            label="Updated after"
            value={values.updatedFrom}
            field="updatedFrom"
            setChange={setChange}
            placeHolder="17-Jan-2021 or -7d or leave blank"
          />
        </div>
        <div className="column is-half">
          <DateInput
            label="Updated before"
            value={values.updatedTo}
            field="updatedTo"
            setChange={setChange}
            placeHolder="23-Mar-2021 or -7d or leave blank"
          />
        </div>
      </div>
      <hr />
      <div className="buttons">
        <button className="button is-primary" type="submit">
          Filter
        </button>
        <button
          className="button is-warning"
          type="button"
          onClick={toggleFilter}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default KitbagKitFilter;
