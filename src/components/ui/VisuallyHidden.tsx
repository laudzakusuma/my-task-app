import React from 'react'

interface VisuallyHiddenProps {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

export default function VisuallyHidden({ 
  children, 
  as: Component = 'span' 
}: VisuallyHiddenProps): React.JSX.Element {
  return (
    <Component className="visually-hidden">
      {children}
    </Component>
  )
}