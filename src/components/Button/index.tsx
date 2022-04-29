import classNames from 'classnames'
import React from 'react'
import { ButtonProps } from './index.props'
import style from './index.module.css'

export const Button = ({
  withInput = false,
  Icon,
  onInputChange,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={classNames(style.button, className)}>
      {withInput && (
        <input
          className={classNames(style.input)}
          accept="image/*"
          type="file"
          onChange={onInputChange}
        />
      )}
      {Icon && <Icon className={classNames(style.icon)} />}
      {children}
    </button>
  )
}
