/* GlobalStyle.js */

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Mövcud stillərinin ardına bu animasiyanı əlavə et */

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   -0.05em -0.025em 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    14% {
      text-shadow: 0.05em 0 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   -0.05em -0.025em 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    15% {
      text-shadow: -0.05em -0.025em 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   0.025em 0.025em 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    49% {
      text-shadow: -0.05em -0.025em 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   0.025em 0.025em 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    50% {
      text-shadow: 0.025em 0.05em 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   0.05em 0 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    99% {
      text-shadow: 0.025em 0.05em 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   0.05em 0 0 ${(props) => props.theme.accent.glitchSecondary};
    }
    100% {
      text-shadow: -0.025em 0 0 ${(props) => props.theme.accent.glitchPrimary}, 
                   -0.025em -0.025em 0 ${(props) => props.theme.accent.glitchSecondary};
    }
  }

  /* Əgər hələ əlavə etməmisənsə, yazının gradient olması üçün bu klası da istifadə edə bilərsən */
  .glitch-text {
    display: inline-block;
    animation: glitch 1s linear infinite;
  }
`;

export default GlobalStyle;
