import { useState } from 'react'


function App() {

  return (
    <div>
      <Routes>
          <Route path={"/"} element={<><Header/><AdmAppbar/></>}/>
          <Route path={"/login"} element={<><Login/></>}/>
          <Route path={"/user"} element={<><Header/><AdmAppbar selectedTab={'1'} elementToShow={<>hello</>}/></>} />
          <Route path={"/organization"} element={<><Header/><AdmAppbar selectedTab={'1'} elementToShow={<>hello</>}/></>} />
          <Route path={"/role"} element={<><Header/><AdmAppbar selectedTab={'1'} elementToShow={<>hello</>}/></>} />
          <Route path={"/new_point"} element={<><Header/><AdmAppbar selectedTab={'1'} elementToShow={<>hello</>}/></>} />
          <Route path={"/accessibility_feature"} element={<><Header/><AdmAppbar selectedTab={'1'} elementToShow={<>hello</>}/></>} />

      </Routes>
    </div>
  )
}

export default App
