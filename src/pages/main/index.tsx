import classNames from 'classnames'
import React, { useState } from 'react'
import style from './index.module.css'
import UploadIcon from '../../../public/icons/upload-file.svg'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'

export const Main = () => {
  const [imageName, setImageName] = useState('')
  const [image, setImage] = useState('')
  const [croppedImage, setCroppedImage] = useState('')
  const [displayModal, setDisplayModal] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      const file = event.target.files[0]

      reader.addEventListener('load', () => {
        reader.result ? setImage(reader.result.toString()) : null
      })

      reader.readAsDataURL(file)
      setImageName(file.name)
      setDisplayModal(true)
    }
  }

  return (
    <div className={classNames(style.container)}>
      {croppedImage && (
        <div className={classNames(style.renderContainer)}>
          <img src={croppedImage} className={classNames(style.image)} />
        </div>
      )}
      {image && (
        <Modal
          imageSrc={image}
          setImage={setCroppedImage}
          imageName={imageName}
          displayModal={displayModal}
          setDisplayModal={value => setDisplayModal(value)}
        />
      )}
      <Button Icon={UploadIcon} onInputChange={onChange} withInput={true}>
        <p>Upload image</p>
      </Button>
    </div>
  )
}
