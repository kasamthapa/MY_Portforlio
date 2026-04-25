import { useState, useEffect } from 'react'

export function useScrappyMode() {
  const [scrappy, setScrappy] = useState(false)

  useEffect(() => {
    if (scrappy) {
      document.documentElement.classList.add('scrappy')
    } else {
      document.documentElement.classList.remove('scrappy')
    }
  }, [scrappy])

  return { scrappy, toggle: () => setScrappy((s) => !s) }
}
