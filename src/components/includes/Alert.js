import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetToast, shownToast } from '../../actions/ToastActions';

const mapDispatchToProps = {
  resetToast,
  shownToast
};

const mapStateToProps = state => ({
  toast: state.toast
});

const Alert = ({ resetToast, shownToast, toast }) => {
  useEffect(() => {
    return function clearUp() {
      resetToast();
    };
  }, [resetToast]);

  function alertStyle(style) {
    switch (style) {
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-success';
    }
  }

  if (!toast || !toast.currentMessage) return null;

  return (
    <div className={`alert ${alertStyle(toast.currentStyle)}`} role="alert">
      {toast.currentMessage}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
