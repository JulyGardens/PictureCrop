import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { Button } from '../Button'
import getCroppedImg from './cropImage'
import style from './index.module.css'
import { CardProps } from './index.props'

export const Card = ({
  imageSrc,
  imageName,
  className,
  setImage,
  setDisplayModal,
  ...props
}: CardProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )

      setImage(croppedImage as string)
      setDisplayModal(false)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <div className={classNames(style.container)} {...props}>
      {imageName && <p className={classNames(style.text)}>{imageName}</p>}
      <div
        className={classNames(className, style.card, {
          [style.hidden]: !imageSrc.length,
        })}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      </div>
      <Button style={{ marginTop: '200px' }} onClick={cropImage}>
        <p>Crop</p>
      </Button>
    </div>
  )
}

{
  /* <div className={classNames(style.renderContainer)}>
  <img className={classNames(style.image)} src={imageSrc} />
  <div className={classNames(style.cropContainer)} />
</div> */
}
