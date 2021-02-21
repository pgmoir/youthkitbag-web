import React from 'react';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const KitbagMemebrAccept = ({ match }) => {
  // const { kitbagId } = match.params;
  // const [kitbag, setKitbag] = useState({
  //   name: '',
  //   description: '',
  //   images: [],
  //   members: [],
  //   topImage: ImageUrls.DEFAULT,
  //   imagesToUpload: 0
  // });

  // useEffect(() => {
  //   if (kitbagId) {
  //     fetchKitbag(kitbagId);
  //   }
  // }, [fetchKitbag, kitbagId]);

  // useEffect(() => {
  //   if (current && current._id) {
  //     const newKitbag = {
  //       ...current,
  //       imagesToUpload: 0
  //     };
  //     setKitbag(newKitbag);
  //   }
  // }, [current]);

  // function kitbagIsLoading() {
  //   return kitbagId && !kitbag._id;
  // }

  // function getTitle() {
  //   if (kitbagIsLoading()) {
  //     return 'Loading ...';
  //   }
  //   const leftState = kitbag.kitbagMemberState === 'left' ? ' (left)' : '';
  //   return kitbag._id ? `${kitbag.name}${leftState}` : 'Create new kitbag';
  // }

  return (
    <div>
      <Title title="Accept membership" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-end"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KitbagMemebrAccept;
