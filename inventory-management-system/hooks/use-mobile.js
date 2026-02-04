import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMediaChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mediaQuery.addEventListener('change', handleMediaChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  return !!isMobile
}
