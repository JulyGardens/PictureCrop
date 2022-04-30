import classNames from 'classnames'
import React from 'react'
import style from './index.module.css'
import { ImageCardProps } from './index.props'

export const ImageCard = ({
  imageSrc,
  imageName,
  className,
  imageRef,
  children,
  ...props
}: ImageCardProps) => {
  return (
    <div className={classNames(style.container)} {...props}>
      {imageName && <p className={classNames(style.text)}>{imageName}</p>}
      <div
        className={classNames(className, style.card, {
          [style.hidden]: !imageSrc.length,
        })}
      >
        <div className={classNames(style.renderContainer)}>
          <img
            ref={imageRef}
            className={classNames(style.image)}
            src={imageSrc}
            alt="img"
          />
        </div>
      </div>
    </div>
  )
}

{
  /* <div className={classNames(style.renderContainer)}>
  <img className={classNames(style.image)} src={imageSrc} />
  <div className={classNames(style.cropContainer)} />
</div> */
}
