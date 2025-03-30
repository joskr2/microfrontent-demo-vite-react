import * as Headless from '@headlessui/react'
import type React from 'react'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <a {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
