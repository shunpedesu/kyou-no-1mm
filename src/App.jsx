import { useState } from 'react'
import { useStorage } from './hooks/useStorage'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import History from './components/History'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const { isOnboarded, setOnboarded } = useStorage()
  const [screen, setScreen] = useState(isOnboarded() ? 'home' : 'onboarding')

  function handleOnboardingFinish() {
    setOnboarded()
    setScreen('home')
  }

  if (screen === 'onboarding') {
    return <Onboarding onFinish={handleOnboardingFinish} />
  }

  if (screen === 'about') {
    return <About onBack={() => setScreen('home')} />
  }

  const footer = <Footer onAbout={() => setScreen('about')} />

  if (screen === 'history') {
    return (
      <>
        <History onBack={() => setScreen('home')} />
        {footer}
      </>
    )
  }

  return (
    <>
      <Home onNavigateHistory={() => setScreen('history')} />
      {footer}
    </>
  )
}
