import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LocationTable from './locations/components/LocationTable'
import Spliiter from './locations/layouts/Splitter'
import LocationMap from './locations/components/LocationMap'

function App() {


  return (
    <>
      <Spliiter locationTable={<LocationTable />} locationMap={<LocationMap />} />
    </>
  )
}

export default App
