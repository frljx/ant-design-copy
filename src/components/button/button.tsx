import classNames from 'classnames'
import React from 'react'
import { cloneElement, isReactFragment, isString, tuple } from '../../shared'
import SizeContext from '../config-provider/SizeContext'
import Group, { GroupSizeContext } from './button-group'

/** 先定义各种类型 */
const ButtonTypes = tuple(
  'default',
  'primary',
  'ghost',
  'dashed',
  'link',
  'text'
)
export type ButtonType = typeof ButtonTypes[number]

function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link'
}

/** 按钮存在两个文字时，在中间插入空格 */
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (child === null || child === undefined) {
    return
  }
  const SPACE = needInserted ? ' ' : ''

  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    })
  }
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? (
      <span>{child.split('').join(SPACE)}</span>
    ) : (
      <span>{child}</span>
    )
  }
  if (isReactFragment(child)) {
    return <span>{child}</span>
  }
  return child
}

/** 执行插入空格 */
function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false
  const childList: React.ReactNode[] = []

  React.Children.forEach(children, (child) => {
    const type = typeof child
    const isCurrentChildPure = type === 'string' || type === 'number'
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1
      const lastChild = childList[lastIndex]
      childList[lastIndex] = `${lastChild}${child}`
    } else {
      childList.push(child)
    }
    isPrevChildPure = isCurrentChildPure
  })

  return React.Children.map(childList, (child) =>
    insertSpace(child as React.ReactChild, needInserted)
  )
}

const ButtonShapes = tuple('default', 'circle', 'round')
export type ButtonShape = typeof ButtonShapes[number]

const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = typeof ButtonHTMLTypes[number]

export type LegacyButtonType = ButtonType | 'danger'

export type SizeType = 'small' | 'middle' | 'large' | undefined

/** 按钮的基础属性 */
export interface BaseButtonProps {
  type?: ButtonType
  icon?: React.ReactNode
  /**
   * Shape of Button
   * @default default
   */
  shape?: ButtonShape
  size?: SizeType
  disabled?: boolean
  loading?: boolean | { delay?: number }
  prefixCls?: string
  className?: string
  ghost?: boolean
  danger?: boolean
  block?: boolean
  children?: React.ReactNode
}

/** 锚点按钮和原生按钮类型 */
export type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType
  onClick?: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

/** 复合组件接口 */
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof Group
  __ANT_BUTTON: boolean
}

type Loading = number | boolean

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    danger,
    shape = 'default',
    size: customizeSize,
    disabled: customDisabled,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props

  const size = React.useContext(SizeContext)

  const disabled = React.useContext(DisabledContext)
  const mergeDisabled = customDisabled
}

// export type ButtonProps = Partial<>

// export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {}

const Button = () => {
  return <button>测试</button>
}

export default Button
