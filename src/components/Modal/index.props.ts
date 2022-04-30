import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  displayModal: boolean
  setDisplayModal: (display: boolean) => void
  setImage: (value: string) => void
}
