export default function validate(values) {
  let errors = [];

  // if (!values.email) {
  //   errors.email = 'Email address is required';
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = 'Email address is invalid';
  // } else if (values.email.length <= 5) {
  //   errors.email = 'Email address must be 6 or more characters';
  // }

  // if (!values.password) {
  //   errors.password = 'Password is required';
  // } else if (values.password.length <= 4) {
  //   errors.password = 'Password must be 5 or more characters';
  // }

  // if (!values.confirmPassword) {
  //   errors.confirmPassword = 'Please re-confirm your password';
  // }

  // if (
  //   values.password &&
  //   values.confirmPassword &&
  //   values.password !== values.confirmPassword
  // ) {
  //   errors.confirmPassword = 'Confirm password must match password';
  // }

  return errors;
}
