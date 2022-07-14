import classNames from 'classnames'
import * as React from 'react'
import { ConfigContext } from '../config-provider/context'
import { SizeType } from './button'

export interface ButtonGroupProps {
  size?: SizeType
  style?: React.CSSProperties
  className?: string
  prefixCls?: string
  children?: string
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(
  undefined
)

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext)

  const { prefixCls: customizePrefixCls, size, className, ...others } = props
  const prefixCls = getPrefixCls('btn-group', customizePrefixCls)
  let sizeCls = ''
  switch (size) {
    case 'large':
      sizeCls = 'lg'
      break
    case 'small':
      sizeCls = 'sm'
      break
    case 'middle':
    case undefined:
      break
    default:
      console.warn('Invalid prop `size`.')
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  )

  return (
    <GroupSizeContext.Provider value={size}>
      <div {...others} className={classes} />
    </GroupSizeContext.Provider>
  )
}

export default ButtonGroup
