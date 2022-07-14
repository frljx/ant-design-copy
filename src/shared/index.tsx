import React, { isValidElement } from 'react'

type AnyObject = Record<any, any>
type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined)

export function isString(str: any) {
  return typeof str === 'string'
}

export const tuple = <T extends string[]>(...args: T) => args

export const replaceElement = (
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: RenderProps
): React.ReactNode => {
  if (!isValidElement(element)) return replacement
  return React.cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  )
}

export const cloneElement = (
  element: React.ReactNode,
  props?: RenderProps
): React.ReactElement => {
  return replaceElement(element, element, props) as React.ReactElement
}

export const isReactFragment = (node: React.ReactNode) => {
  return React.isValidElement(node) && node.type === React.Fragment
}
