import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageSrc: string
  imageName: string
  displayModal: boolean
  setDisplayModal: (display: boolean) => void
  setImage: (url: string) => void
}
