import {MyRoutes, Light, Dark, AuthContextProvider, Sidebar, Device, MenuHambur} from "./index";
import {createContext, useState} from "react";
import {ThemeProvider} from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { styled } from "styled-components"
import { useLocation } from "react-router-dom"


export const ThemeContext = createContext(null)

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState("light");
  const themeStyle = theme ==="light"?Light : Dark;

  const [sidebarOpen, setSidebarOpen]= useState(false);
  
  return (
    <>
    <ThemeContext.Provider value={{setTheme, theme}}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          
{pathname!="/login"?(<Container className={sidebarOpen ? "active" : ""}>
            <div className="ContentSidebar">
            <Sidebar  state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
            <div className="ContentMenuHambur">
            <MenuHambur />
            </div>
             
            <Containerbody>
              <MyRoutes />
            </Containerbody>
          </Container>):(<MyRoutes />)}
          
         

         <ReactQueryDevtools initialIsOpen={true} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuHambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuHambur {
      display: none;
    }
  }
`;
const Containerbody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
export default App
