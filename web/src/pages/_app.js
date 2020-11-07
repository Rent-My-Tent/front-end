// Baseui and Styletron
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import { styletron, debug } from '../../styletron'
import Header from '../components/Header'

// global.css
import '../../styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'

export default ({ Component, pageProps }) => {
    return (
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <BaseProvider theme={LightTheme}>
                <Header />
                <Component {...pageProps} />
            </BaseProvider>
        </StyletronProvider>
    )
}
