import TableOrganization from './organizations/organizations.table'
import './App.css'
import LocationTable from './locations/components/LocationTable'
import Spliiter from './locations/layouts/Splitter'
import LocationMap from './locations/components/LocationMap'
import FromOrganization from './organizations/organizations.form'
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
