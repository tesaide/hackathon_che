import Header from "./Header.jsx";
import AppBar from "./AppBar.jsx";

export const MainLayout = ({children}) => {
  return <>
    <Header />
    <AppBar>{children}</AppBar>
  </>
}
