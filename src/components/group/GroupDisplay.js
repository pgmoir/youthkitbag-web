import React from 'react';
import TextAreaInput from '../includes/controls/TextAreaInput';
import TextInput from '../includes/controls/TextInput';
import { ImagesDisplay } from '../includes/forms/ImagesDisplay';

const GroupDisplay = ({ group }) => {
  if (!group._id) return null;

  // const showGroupUrl = `${window.location
  //   .toString()
  //   .replace('/groups/', '/show/group/')}`;

  return (
    <>
      <div className="columns mb-3">
        <div className="column">
          <ImagesDisplay images={group.images} />
        </div>
        <div className="column">
          <TextAreaInput
            label="Description"
            value={group.description}
            readOnly={true}
          />
          <TextInput label="Website" value={group.website} readOnly={true} />
          <TextInput
            label="Activities"
            value={group.activitys?.join(', ')}
            readOnly={true}
          />
          {/* <h2 className="h5">
            Copy and share the link below to promote this group
          </h2>
          <p>
            <a href={showGroupUrl} target="_blank" rel="noopener noreferrer">
              {showGroupUrl}
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default GroupDisplay;
