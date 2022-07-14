import React from 'react'
import { SizeType } from './SizeContext'

export type DirectionType = 'ltr' | 'rtl' | undefined
export interface CSPConfig {
  nonce?: string
}

/** 配置消费属性 */
export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  rootPrefixCls?: string
  iconPrefixCls?: string
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  // renderEmpty?: RenderEmptyHandler
  csp?: CSPConfig
  autoInsertSpaceInButton?: boolean
  input?: {
    autoComplete?: string
  }
  pagination?: {
    showSizeChanger?: boolean
  }
  // locale?: Locale;
  pageHeader?: {
    ghost: boolean
  }
  direction?: DirectionType
  space?: {
    size?: SizeType | number
  }
}

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls
  return suffixCls ? `ant-${suffixCls}` : 'ant'
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
})

export const ConfigConsumer = ConfigContext.Consumer
