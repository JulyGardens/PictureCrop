import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import style from './index.module.css'
import UploadIcon from '../../../public/icons/upload-file.svg'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { ImageCard } from '../../components/ImageCard'
import { Crop } from '../../components/Crop'

export const Main = () => {
  const [imageName, setImageName] = useState('')
  const [image, setImage] = useState('')
  const [croppedImage, setCroppedImage] = useState('')
  const [displayModal, setDisplayModal] = useState(false)

  const imageRef = useRef<HTMLImageElement>(null)

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
        <ImageCard imageName={imageName} imageSrc={croppedImage} />
      )}
      {image && (
        <Modal
          setImage={setImage}
          displayModal={displayModal}
          setDisplayModal={value => setDisplayModal(value)}
        >
          <Crop
            imageRef={imageRef}
            setImage={setImage}
            imageSrc={image}
            setCroppedImage={setCroppedImage}
            setDisplayModal={setDisplayModal}
          >
            <img
              ref={imageRef}
              src={image}
              className={classNames(style.imageCrop)}
            />
          </Crop>
        </Modal>
      )}
      <Button
        className={classNames(style.button)}
        Icon={UploadIcon}
        onInputChange={onChange}
        withInput={true}
        onClick={() => {
          setCroppedImage('')
          setImageName('')
        }}
      >
        <p>Upload image</p>
      </Button>
    </div>
  )
}
