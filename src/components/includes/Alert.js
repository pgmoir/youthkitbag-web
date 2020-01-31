import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetToast } from '../../actions/ToastActions';

const mapStateToProps = state => ({
  toast: state.toast
});

const mapDispatchToProps = {
  resetToast
};

const Alert = ({ toast, resetToast }) => {
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

  function alertIcon(style) {
    switch (style) {
      case 'error':
        return 'fa-times-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      default:
        return 'fa-check-circle';
    }
  }

  if (!toast || !toast.currentMessage) return null;

  return (
    <div
      className={`alert ${alertStyle(
        toast.currentStyle
      )} d-flex flex-row align-items-center`}
      role="alert"
    >
      <div className="pr-4">
        <span className={`fas ${alertIcon(toast.currentStyle)} fa-2x`}></span>
      </div>
      <div>
        <p className="my-0">{toast.currentMessage}</p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
