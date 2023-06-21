import React from 'react'
import { motion } from 'framer-motion'

export interface CountryModalProps {
  children?: React.ReactNode
  constraintRef: React.RefObject<HTMLElement>
}

export const CountryModal = ({
  children,
  constraintRef,
}: CountryModalProps) => {
  return (
    <motion.div
      drag
      dragConstraints={constraintRef}
      dragMomentum={false}
      whileDrag={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className={
        'absolute top-0 right-0 bg-slate-300 dark:bg-slate-700 rounded-xl overflow-hidden drop-shadow-2xl cursor-move'
      }
    >
      {children}
    </motion.div>
  )
}
