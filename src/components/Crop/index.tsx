import classNames from 'classnames'
import React, { MouseEvent, useEffect, useState } from 'react'
import { CropProps } from './index.props'
import style from './index.module.css'
import { Button } from '../Button'
import getCroppedImg from '../../helpers/cropImage'
import CropIcon from '../../../public/icons/crop-file.svg'

export const Crop = ({
  setCroppedImage,
  imageSrc,
  imageRef,
  className,
  children,
  setImage,
  setDisplayModal,
  ...props
}: CropProps) => {
  const [crop, setCrop] = useState<any>()
  const [test, setTest] = useState<any>()
  // const [res1, setRes1] = useState<any>()

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0

  // useEffect(() => {
  //   setRes1((children as any).ref.current.getBoundingClientRect())
  // }, [])

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    pos3 = event.clientX
    pos4 = event.clientY

    event.currentTarget.onmouseup = onMouseUp as any
    event.currentTarget.onmousemove = onMouseMove as any
  }
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    const { offsetTop, offsetLeft } = (children as any).ref.current

    pos1 = pos3 - event.clientX
    pos2 = pos4 - event.clientY
    pos3 = event.clientX
    pos4 = event.clientY

    const target = event.currentTarget

    const prevOffsetTop = target.offsetTop
    const prevOffsetLeft = target.offsetLeft
    const targetOffsetTop = target.offsetTop - pos2
    const targetOffsetLeft = target.offsetLeft - pos1

    target.style.top = targetOffsetTop + 'px'
    target.style.left = targetOffsetLeft + 'px'

    const res1 = (children as any).ref.current.getBoundingClientRect()
    const res2 = event.currentTarget.getBoundingClientRect()

    if (
      targetOffsetLeft < offsetLeft ||
      targetOffsetTop < offsetTop ||
      res2.bottom > res1.bottom ||
      res2.right > res1.right
    ) {
      target.style.top = prevOffsetTop + 'px'
      target.style.left = prevOffsetLeft + 'px'

      return
    }

    setCrop(res2)
    setTest({
      x: res2.left,
      y: res2.top,
    })
  }
  const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.onmouseup = null
    event.currentTarget.onmousemove = null
  }
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, crop, {
        x: test.x,
        y: test.y,
      })

      setCroppedImage(croppedImage)
      setDisplayModal(false)
      setImage('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={classNames(style.container)}>
      <div className={classNames(style.renderContainer)}>
        {children}
        <div
          onMouseDown={onMouseDown}
          className={classNames(style.crop, className)}
          {...props}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(el => (
            <div key={el} className={classNames(style.cropBorder)} />
          ))}
        </div>
      </div>
      <Button
        Icon={CropIcon}
        className={classNames(style.cropButton)}
        onClick={onClick}
      >
        Crop
      </Button>
    </div>
  )
}
