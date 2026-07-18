import { useState } from 'react'
import Homepage from './components/Homepage'
import VillageView from './components/VillageView'

export default function App() {
  const [selectedVillage, setSelectedVillage] = useState(null)

  return selectedVillage ? (
    <VillageView
      village={selectedVillage}
      onBack={() => setSelectedVillage(null)}
    />
  ) : (
    <Homepage onSelectVillage={setSelectedVillage} />
  )
}