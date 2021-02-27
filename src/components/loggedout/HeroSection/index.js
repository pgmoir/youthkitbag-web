import React, { useState } from 'react';
import {
  ArrowForward,
  ArrowRight,
  HeroBtnWrapper,
  HeroContainer,
  HeroContent,
  HeroH1,
  HeroP,
} from './HeroElements';
import { Button } from '../ButtonElements';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer>
      <HeroContent>
        <HeroH1>
          Organise with Security
          <br />
          Trade with Safety
        </HeroH1>
        <HeroP>
          Track your childs school, sports, music and other interest kit. Then
          trade or share with the people you know and trust when it is no longer
          needed, lost or stolen.
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to="signup"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
