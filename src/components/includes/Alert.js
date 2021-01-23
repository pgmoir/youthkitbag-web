import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetToast } from '../../actions/ToastActions';

const mapStateToProps = (state) => ({
  toast: state.toast,
});

const mapDispatchToProps = {
  resetToast,
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
        return 'is-danger';
      case 'warning':
        return 'is-warning';
      default:
        return 'is-success';
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
      className={`notification is-light is-flex ${alertStyle(
        toast.currentStyle
      )}`}
      role="alert"
    >
      <div className="pr-4">
        <span
          className={`fas ${alertIcon(toast.currentStyle)} fa-2x`}
          title="Alert message"
        ></span>
      </div>
      <div className="flex-grow">
        <p>{toast.currentMessage}</p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
