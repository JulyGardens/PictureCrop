import { DetailedHTMLProps, HTMLAttributes, Ref } from 'react'

export interface ImageCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageSrc: string
  imageName: string
  imageRef?: Ref<HTMLImageElement>
}
