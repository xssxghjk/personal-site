import React from 'react'
import { motion } from 'framer-motion'

export interface CountryModalProps {
  children?: React.ReactNode
}

export const CountryModal = ({ children }: CountryModalProps) => {
  return (
    <div
      className={
        'fixed bottom-3 right-3 md:bottom-4 md:right-4 lg:right-6 lg:bottom-6'
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        className={
          'bg-slate-300 dark:bg-slate-700 rounded-xl overflow-hidden drop-shadow-2xl'
        }
      >
        {children}
      </motion.div>
    </div>
  )
}
