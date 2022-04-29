import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageSrc: string
  imageName: string
  setImage: (url: string) => void
  setDisplayModal: (bool: boolean) => void
}
