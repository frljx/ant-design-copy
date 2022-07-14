import React from 'react'

export type DisabledType = true | false | undefined

const DisabledContext = React.createContext<DisabledType>(false)

export default DisabledContext

export interface DisabledContextProps {
  disabled?: DisabledType
}
