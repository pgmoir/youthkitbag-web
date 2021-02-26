import React from 'react';
import SignUpForm from '../../auth/SignUpForm';
import { SignUpContainer, SignUpWrapper } from './SignUpElements';

const SignUpSection = () => {
  return (
    <SignUpContainer id="signup">
      <SignUpWrapper>
        <SignUpForm />
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUpSection;
