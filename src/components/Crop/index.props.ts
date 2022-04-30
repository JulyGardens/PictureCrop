import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface CropProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageSrc: string
  imageRef: any
  setCroppedImage: (value: any) => void
  setDisplayModal: (value: boolean) => void
  setImage: (value: string) => void
}
