import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiMaximize } from 'react-icons/fi'
import { Link, useLoaderData } from '@remix-run/react'
import { loader } from '~/routes/travel.$'

export interface CountryModalProps {
  children?: React.ReactNode
  country: string
}

export const CountryModalHoverContext =
  React.createContext<boolean>(false)

export const CountryModal = ({
  children,
  country,
}: CountryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  useEffect(() => {
    if (!modalRef.current) return
    modalRef.current.addEventListener('mouseenter', () => {
      setIsHovering(() => true)
    })
    modalRef.current.addEventListener('mouseleave', () =>
      setIsHovering(() => false)
    )
  }, [modalRef])

  const sharedIconStyles =
    ' h-4 w-4 md:h-6 md:w-6 z-20 stroke-slate-300 hover:stroke-slate-100 hover:scale-125 transition-all duration-200 '
  return (
    <div
      className={
        'transition-all fixed bottom-3 right-3 md:bottom-4 md:right-4 lg:right-6 lg:bottom-6'
      }
      ref={modalRef}
    >
      <motion.div
        key={1}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        className={
          'bg-slate-700 rounded-xl overflow-hidden drop-shadow-2xl'
        }
      >
        <div
          className={
            'z-10 h-full w-full absolute bg-slate-900 transition-all ' +
            (isHovering ? 'opacity-30' : 'opacity-0')
          }
        />
        <Link to={'/travel'}>
          <FiX
            className={
              'absolute top-2 right-2 transition-all' +
              sharedIconStyles +
              (isHovering
                ? 'opacity-100 cursor-pointer'
                : 'opacity-0')
            }
          />
        </Link>
        <Link to={`./${country}/test`}>
          <FiMaximize
            size={24}
            className={
              'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transition-all' +
              sharedIconStyles +
              (isHovering
                ? 'opacity-100 cursor-pointer'
                : 'opacity-0')
            }
          />
        </Link>
        <CountryModalHoverContext.Provider value={isHovering}>
          {children}
        </CountryModalHoverContext.Provider>
      </motion.div>
    </div>
  )
}
