import React from 'react';
import { connect } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';
import GroupMember from './GroupMember';

class GroupMembers extends React.Component {
  getTitle() {
    return `${this.props.memberList.name} - members (${this.props.memberList.members.length})`;
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.fetchGroupMembers(groupId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const groupId = this.props.match.params.groupId;
      this.props.fetchGroupMembers(groupId);
    }
  }

  renderBlank() {
    return (
      <div>
        <Title title="Loading ...." />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <div className="row">{this.renderBlankMembers()}</div>
          </div>
        </section>
      </div>
    );
  }

  renderBlankMembers() {
    const blankMembers = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankMembers.map((member, index) => {
      return <GroupMember key={`${member._id}-${index}`} member={member} />;
    });
  }

  renderList() {
    if (!this.props.memberList.members) return this.renderBlankMembers();

    let members = [...this.props.memberList.members];

    if (members.length < 12) {
      for (var i = members.length; i < 12; i++) {
        members.push({});
      }
    }

    return members.map((member, index) => {
      return (
        <GroupMember
          key={`${member._id}-${index}`}
          member={member}
          groupId={this.props.memberList._id}
        />
      );
    });
  }

  render() {
    if (!this.props.memberList._id) return this.renderBlank();

    return (
      <div>
        <Title title={this.getTitle()} />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <Alert />
            <div className="row">{this.renderList()}</div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { memberList: state.group.memberList };
};

export default connect(
  mapStateToProps,
  { fetchGroupMembers }
)(GroupMembers);
