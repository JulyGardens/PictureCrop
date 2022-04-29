import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { ModalProps } from './index.props'
import style from './index.module.css'
import { Card } from '../Card'
import CloseIcon from '../../../public/icons/close-file.svg'
import { Button } from '../Button'

export const Modal = ({
  imageSrc,
  displayModal,
  setDisplayModal,
  imageName,
  className,
  setImage,
  ...props
}: ModalProps) => {
  const onClick = () => {
    setDisplayModal(false)
  }

  return (
    <div
      className={classNames(className, style.modal, {
        [style.displayModal]: displayModal,
      })}
      {...props}
    >
      <div className={classNames(style.modalContent)}>
        <Card
          setDisplayModal={setDisplayModal}
          setImage={setImage}
          imageSrc={imageSrc}
          imageName={imageName}
        />
        <Button
          Icon={CloseIcon}
          onClick={onClick}
          style={{ marginBottom: '30px' }}
        >
          <p>Close modal</p>
        </Button>
      </div>
    </div>
  )
}
