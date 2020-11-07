import { Input } from 'baseui/input'
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui'

export default (props) => {
    return (
        <ThemeProvider
            theme={createTheme(lightThemePrimitives, {
                colors: {
                    inputFill: props.backgroundColor,
                    inputBorder: props.backgroundColor,
                    inputFillActive: props.backgroundColor,
                },
            })}
        >
            <Input
                {...props}
                overrides={{
                    Root: {
                        style: ({ $theme }) => {
                            return {
                                borderRadius: '10px',
                                padding: '0',
                            }
                        },
                    },
                }}
            />
        </ThemeProvider>
    )
}
