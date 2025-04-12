import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlacesTable from './locations/components/PlacesTable'
import Spliiter from './locations/layouts/Splitter'
import PlacesMap from './locations/components/PlacesMap'

function App() {


  return (
    <>
      <Spliiter placesTable={<PlacesTable />} placesMap={<PlacesMap />} />
    </>
  )
}

export default App
