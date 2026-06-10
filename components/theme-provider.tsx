'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isAnimating: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = async () => {
    if (isAnimating) return

    const root = document.documentElement

    // New URL every transition, to ensure the GIF animation restarts on each toggle
    root.style.setProperty(
      '--transition-mask',
      `url("/bad-apple-no-bg.gif?v=${crypto.randomUUID()}")`
    )

    await new Promise(resolve => requestAnimationFrame(resolve))

    const run = () => {
      setTheme(prev => {
        const next = prev === 'dark' ? 'light' : 'dark'

        root.classList.toggle('dark', next === 'dark')
        localStorage.setItem('theme', next)

        return next
      })
    }

    if (!document.startViewTransition) {
      run()
      return
    }

    setIsAnimating(true)

    const transition = document.startViewTransition(run)

    await transition.finished

    setIsAnimating(false)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
      isAnimating: false,
    }
  }
  return context
}
