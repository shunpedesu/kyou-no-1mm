import { useState } from 'react'
import { useStorage } from './hooks/useStorage'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import History from './components/History'

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

  if (screen === 'history') {
    return <History onBack={() => setScreen('home')} />
  }

  return <Home onNavigateHistory={() => setScreen('history')} />
}
