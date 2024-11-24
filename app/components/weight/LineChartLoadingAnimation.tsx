/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import React from 'react'

const dash = keyframes`
    0% {
        stroke-dashoffset: 300;
    }
    100% {
        stroke-dashoffset: 0;
    }
`

const lineChartLoadingStyle = css`
  stroke: #4a90e2;
  stroke-width: 4;
  fill: none;
  stroke-dasharray: 150;
  animation: ${dash} 1s linear infinite;
`

export const LineChartLoadingAnimation = () => {
  return (
    <svg
      width="200"
      height="120"
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        css={lineChartLoadingStyle}
        d="M10 80 Q 52.5 10, 95 80 T 180 80"
      />
    </svg>
  )
}
