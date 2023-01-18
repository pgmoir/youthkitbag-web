import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import Alert from '../../includes/Alert';
import Title from '../../includes/title/Title';
import KitCard from './KitCard';
import SearchFilter from '../../includes/SearchFilter';
import Pagination from '../../includes/Pagination';
import Breadcrumb from '../../includes/Breadcrumb';

const mapStateToProps = (state) => ({
  stateFilter: state.kitbag.kit.filter,
  entities: state.kitbag.kit.entities,
  pagination: state.pagination,
  kitbags: state.user.kitbags,
  lists: state.kitbag.kit.lists
});

const mapDispatchToProps = {
  fetchKitbagKits
};

const Kitbag = ({
  stateFilter,
  entities,
  pagination,
  kitbags,
  fetchKitbagKits,
  match
}) => {
  const { kitbagId } = useParams;
  const [filter, setFilter] = useState(stateFilter);
  const [displayRow, setDisplayRow] = useState(false);

  useEffect(() => {
    fetchKitbagKits({
      ...filter,
      kitbagId
    });
  }, [filter, fetchKitbagKits, kitbagId]);

  function getTitle(includeCount = true) {
    if (!kitbags) {
      return 'Loading ...';
    }
    const kitbag = kitbags.find((a) => a.preferred);

    if (includeCount) {
      return `${kitbag.name} (${pagination.totalItems})`;
    }

    return `${kitbag.name}`;
  }

  const crumbs = [{ title: 'Home', to: '/' }, { title: getTitle(false) }];

  function renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <KitCard key={`${index}`} kit={item} />;
    });
  }

  if (!Object.keys(entities)) {
    return (
      <div className="container is-fluid px-0">
        <Title title="Loading ...." />
        <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
          {renderBlankList()}
        </div>
      </div>
    );
  }

  function renderCards(isCard) {
    return Object.keys(entities).map((key) => {
      return (
        <KitCard
          key={key}
          kit={entities[key]}
          kitbagId={kitbagId}
          callback={setFilter}
          isCard={isCard}
        />
      );
    });
  }

  function updateDisplay() {
    setDisplayRow(!displayRow);
  }

  return (
    <>
      <div className="main container is-fluid">
        <Breadcrumb crumbs={crumbs} />
        <Title
          title={getTitle()}
          icon={displayRow ? 'fas fa-address-card' : 'fas fa-align-justify'}
          iconAction={updateDisplay}
          hasAction={true}
        />
        <Alert />
        <div className="columns">
          <div className="column is-full">
            <SearchFilter
              filter={filter}
              callback={setFilter}
              placeholderText="Search your kit"
            />
          </div>
        </div>
        {displayRow ? (
          <div className="">{renderCards(false)}</div>
        ) : (
          <div className="columns is-multiline is-mobile is-tablet is-desktop is-fullhd">
            {renderCards(true)}
          </div>
        )}
        <div className="mb-3">
          <Pagination
            kitbagId={kitbagId}
            search={filter}
            callback={setFilter}
          />
        </div>
      </div>
      <div className="is-sticky-bottomright icon-text">
        <Link
          to={`/kitbag/kit/${kitbagId}/new`}
          className="icon is-extralarge has-background-success has-text-light is-rounded m-5"
          title="Add new item to your kitbag"
        >
          <i className="fas fa-plus"></i>
        </Link>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Kitbag);
