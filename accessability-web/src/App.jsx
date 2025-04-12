import TableOrganization from './organizations/organizations.table'
import './App.css'
import LocationTable from './locations/components/LocationTable'
import Spliter from './locations/layouts/Splitter'
import LocationMap from './locations/components/LocationMap'
import FromOrganization from './organizations/organizations.form'

function App() {
  return (
    <>
      <FromOrganization />
      <TableOrganization />
      <Spliiter locationTable={<LocationTable />} locationMap={<LocationMap />} />
    </>
  )
}

export default App