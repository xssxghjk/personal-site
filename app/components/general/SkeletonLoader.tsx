/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import React from 'react'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const skeleton = css`
  border-radius: 4px;
  animation: ${shimmer} 1.5s infinite linear;
  background: #e0e0e0
    linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 1000px 100%;
`

const skeletonTitle = css`
  ${skeleton};
  width: 60%;
  height: 24px;
  margin: 4px 0;
`

export const SkeletonLoader = () => {
  return <div css={skeletonTitle} />
}
