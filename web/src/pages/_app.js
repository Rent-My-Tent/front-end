// Baseui and Styletron
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron, debug } from "../../styletron";
import ContextProvider from "../context";
import Header from '../components/Header'

// global.css
import '../../styles/global.css'


export default ({ Component, pageProps }) => {
  return (
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
      <BaseProvider theme={LightTheme}>
        <ContextProvider>
          <Header/>
          <Component {...pageProps} />
        </ContextProvider>
      </BaseProvider>
    </StyletronProvider>
  );
};
