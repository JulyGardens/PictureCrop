import React from 'react'
import classNames from 'classnames'
import style from './index.module.css'
import CloseIcon from '../../../public/icons/close-file.svg'
import { ModalProps } from './index.props'
import { Button } from '../Button'

export const Modal = ({
  displayModal,
  setDisplayModal,
  className,
  children,
  setImage,
  ...props
}: ModalProps) => {
  const onClick = () => {
    setDisplayModal(false)
    setImage('')
  }

  return (
    <div
      className={classNames(className, style.modal, {
        [style.displayModal]: displayModal,
      })}
      {...props}
    >
      <div className={classNames(style.modalContent)}>
        {children}
        <Button
          Icon={CloseIcon}
          onClick={onClick}
          className={classNames(style.buttonMargin)}
        >
          <p>Close modal</p>
        </Button>
      </div>
    </div>
  )
}
