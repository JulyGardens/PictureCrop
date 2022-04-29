import { ChangeEvent, DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => unknown
  withInput?: boolean
  Icon?: any
}
