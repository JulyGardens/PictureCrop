export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: any,
  pixelCrop: any,
  offset: any,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const TO_RADIANS = Math.PI / 180
  const image = (await createImage(imageSrc)) as any
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const scale = 1

  if (!ctx) {
    return null
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1

  canvas.width = Math.floor(pixelCrop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = pixelCrop.x * scaleX
  const cropY = pixelCrop.y * scaleY

  const rotateRads = 0 * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // // 2) Scale the image
  ctx.scale(scale, scale)
  // // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)

  ctx.drawImage(
    image,
    offset.y,
    offset.x,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // const rotRad = getRadianAngle(rotation)

  // // calculate bounding box of the rotated image
  // const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
  //   image.width,
  //   image.height,
  //   rotation
  // )

  // // set canvas size to match the bounding box
  // canvas.width = bBoxWidth
  // canvas.height = bBoxHeight

  // // translate canvas context to a central location to allow rotating and flipping around the center
  // ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  // ctx.rotate(rotRad)
  // ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  // ctx.translate(-image.width / 2, -image.height / 2)

  // // draw rotated image
  // ctx.drawImage(image, 0, 0)

  // // croppedAreaPixels values are bounding box relative
  // // extract the cropped image using these values
  // const data = ctx.getImageData(
  //   pixelCrop.x,
  //   pixelCrop.y,
  //   pixelCrop.width,
  //   pixelCrop.height
  // )

  // // set canvas width to final desired crop size - this will clear existing context
  // canvas.width = pixelCrop.width
  // canvas.height = pixelCrop.height

  // // paste generated rotate image at the top left corner
  // ctx.putImageData(data, 0, 0)

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file!))
    }, 'image/jpeg')
  })
}
