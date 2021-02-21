import React, { useState } from 'react';
import TextInput from '../includes/controls/TextInput';
import ArrayButtonRemove from '../includes/controls/ArrayButtonRemove';
import { MemberRoles } from '../../enums/memberRoles.enum';
import { MemberStates } from '../../enums/memberStates.enum';
import SelectInput from '../includes/controls/SelectInput';
import KitbagMemberDelete from './KitbagMemberDelete';

const KitbagMember = ({
  kitbag,
  values,
  index,
  handleChange,
  errors,
  userId,
}) => {
  const [modalIsActive, setModalIsActive] = useState(false);

  const roleItems = ['', MemberRoles.ADMIN, MemberRoles.MEMBER];
  const stateItems = [
    '',
    MemberStates.INVITED,
    MemberStates.APPROVED,
    MemberStates.SUSPENDED,
  ];

  function deleteMember(e) {
    e.stopPropagation();
    setModalIsActive(true);
  }

  return (
    <>
      <div className="is-flex is-flex-wrap-wrap is-flex-members">
        <div className="mr-3 mb-3 email">
          <TextInput
            value={
              values.members[index].user
                ? values.members[index].user.email
                : values.members[index].email
            }
            field={`members[${index}].user.email`}
            disabled={true}
            iconRight={false}
          />
        </div>
        <div className="mr-3 mb-3 role">
          <SelectInput
            value={values.members[index].role}
            field={`members[${index}].role`}
            handleChange={handleChange}
            error={errors.role}
            items={roleItems}
            disabled={userId === values.members[index].user?._id}
          />
        </div>
        <div className="mr-3 mb-3 state">
          <SelectInput
            value={values.members[index].state}
            field={`members[${index}].state`}
            handleChange={handleChange}
            error={errors.state}
            items={stateItems}
            disabled={userId === values.members[index].user?._id}
          />
        </div>
        <div className="mr-3 mb-5">
          <ArrayButtonRemove
            title="Remove Member"
            onClick={(e) => deleteMember(e)}
            index={index}
            width="1"
            disabled={userId === values.members[index].user?._id}
          />
        </div>
      </div>
      <KitbagMemberDelete
        kitbagId={kitbag._id}
        kitbagName={kitbag.name}
        memberId={values.members[index]._id}
        memberEmail={
          values.members[index].user
            ? values.members[index].user.email
            : values.members[index].email
        }
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
      />
    </>
  );
};

export default KitbagMember;
