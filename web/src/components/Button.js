import * as React from "react";
import { Button, SIZE as size } from "baseui/button";
import {
    ThemeProvider,
    createTheme,
    lightThemePrimitives
  } from "baseui";


export default (props) => {
  return (
    <ThemeProvider
    theme={createTheme(lightThemePrimitives, {
      colors: { buttonPrimaryHover: props.backgroundColorOnHover ? props.backgroundColorOnHover : '#eee' }
    })}
  >  
    <Button
      {...props}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => {
            return {
              backgroundColor: props.backgroundColor ? props.backgroundColor : 'white' ,
              color: props.color ? props.color : 'black',  
              borderRadius: "10px",
            };
          }
        }
      }}
    >
      {props.children}
    </Button>
    </ThemeProvider>

  );
}

export const SIZE = size