import React from 'react';
import Title from '../includes/title/Title';
import Alert from '../includes/Alert';

const AccountMemebrAccept = ({ match }) => {
  // const { accountId } = match.params;
  // const [account, setAccount] = useState({
  //   name: '',
  //   description: '',
  //   images: [],
  //   members: [],
  //   topImage: '/images/default.png',
  //   imagesToUpload: 0
  // });

  // useEffect(() => {
  //   if (accountId) {
  //     fetchAccount(accountId);
  //   }
  // }, [fetchAccount, accountId]);

  // useEffect(() => {
  //   if (current && current._id) {
  //     const newAccount = {
  //       ...current,
  //       imagesToUpload: 0
  //     };
  //     setAccount(newAccount);
  //   }
  // }, [current]);

  // function accountIsLoading() {
  //   return accountId && !account._id;
  // }

  // function getTitle() {
  //   if (accountIsLoading()) {
  //     return 'Loading ...';
  //   }
  //   const leftState = account.accountMemberState === 'left' ? ' (left)' : '';
  //   return account._id ? `${account.name}${leftState}` : 'Create new account';
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

export default AccountMemebrAccept;
