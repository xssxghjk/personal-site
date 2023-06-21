import { motion } from 'framer-motion'
import { position } from 'unist-util-position'

interface LoadingAnimationProps {
  height: number
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.15
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay,
          type: 'spring',
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}
const proportion = 440 / 760
export const Logo = ({ height }: LoadingAnimationProps) => {
  const svgWidth = height * proportion
  const padding = 0
  const svgCenter = (height - padding * 2) / 2 + padding
  const strokeWidth = height / 10
  const baseDiff = height / 100
  const sharedStyles = {
    variants: draw,
    stroke: 'rgb(203, 213, 225)',
    strokeWidth: strokeWidth,
    fill: 'transparent',
  } as const
  return (
    <div className={'p-2 relative'}>
      <motion.svg
        width={svgWidth}
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        initial="hidden"
        animate="visible"
      >
        <motion.line
          x1={padding + strokeWidth / 2}
          x2={padding + strokeWidth / 2}
          y1={padding}
          y2={height - padding}
          custom={1}
          {...sharedStyles}
        />
        <motion.line
          x1={padding}
          x2={svgWidth - padding - baseDiff}
          y1={padding + strokeWidth / 2}
          y2={padding + strokeWidth / 2}
          custom={2}
          {...sharedStyles}
        />
        <motion.line
          x1={padding}
          x2={svgWidth - padding - baseDiff * 2}
          y1={svgCenter}
          y2={svgCenter}
          custom={3}
          {...sharedStyles}
        />
        <motion.line
          x1={padding}
          x2={svgWidth - padding}
          y1={height - padding - strokeWidth / 2}
          y2={height - padding - strokeWidth / 2}
          custom={4}
          {...sharedStyles}
        />
      </motion.svg>
      <div
        style={{
          left: svgWidth,
          fontSize: height,
          lineHeight: height + 'px',
        }}
        className={'absolute bottom-0 ml-4'}
      >
        nes
      </div>
    </div>
  )
}
