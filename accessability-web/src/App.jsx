import TableOrganization from './organizations/organizations.table'
import './App.css'
import PlacesTable from './locations/components/PlacesTable'
import Spliiter from './locations/layouts/Splitter'
import PlacesMap from './locations/components/PlacesMap'
import FromOrganization from './organizations/organizations.form'

function App() {


  return (
    <>
      <Spliiter placesTable={<PlacesTable />} placesMap={<PlacesMap />} />
    </>
  )
}

export default App
