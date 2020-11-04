import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";

import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Combobox } from "baseui/combobox";
import { Label1 } from "baseui/typography";
import { Range } from "react-range";
import DatePicker from "react-datepicker";

import Link from "next/link";
import { useUser } from "../utils/hooks";
import Menu from "./Menu";
const overrides = {
  Root: {
    style: {
      borderBottom: "none",
      backgroundColor: "#f5f5f5",
      padding: "1.5rem",
    },
  },
};

const styles = {
  backgroundColor: "white",
  borderRadius: "10px",
  width: "700px",
  margin: "0 auto",
  padding: "1rem",
};

const options = [
  { label: "AliceBlue", id: "#F0F8FF" },
  { label: "AntiqueWhite", id: "#FAEBD7" },
  { label: "Aqua", id: "#00FFFF" },
  { label: "Aquamarine", id: "#7FFFD4" },
  { label: "Azure", id: "#F0FFFF" },
  { label: "Beige", id: "#F5F5DC" },
];

export default () => {
  // const user = useUser({ redirectTo: "/" });

  const [value, setValue] = React.useState("");
  const [value_slider, setValue_slider] = React.useState([25, 75]);
  const [state, setState] = React.useState({ values: [0, 100] });
  const [startDate, setStartDate] = React.useState(new Date());

  const items = [
    { label: "example@gmail.com", href: "/" },
    { label: "New tent", href: "/new-tent" },
    { label: "log out", href: "/" },
  ];

  return (
    <>
      <HeaderNavigation overrides={overrides}>
        <StyledNavigationList>
          <StyledNavigationItem>
            
            <Link href="/">
              <a className="menu-wrapper">
                Hire a tent
                <div className='search-hoverable-menu' style={styles}>
                  <Grid
                    align={ALIGNMENT.center}
                    gridMargins={0}
                    gridGutters={0}
                    gridGaps={20}
                  >
                    {/* SELECT CATEGORY */}
                    <Cell span={3}>
                      <Label1>Show me :</Label1>
                    </Cell>
                    <Cell span={3}>
                      <Combobox
                        value={value}
                        onChange={setValue}
                        mapOptionToString={(o) => o.label}
                        options={options}
                        name="input-overrides"
                        overrides={{
                          Input: {
                            props: {
                              placeholder: "All Categorys",
                            },
                          },
                        }}
                      />
                    </Cell>
                    {/* SELECT SIZE */}
                    <Cell span={3}>
                      <div style={{ textAlign: "center" }}>
                        <Label1>Size :</Label1>
                      </div>
                    </Cell>
                    <Cell span={3}>
                      <Combobox
                        value={value}
                        onChange={setValue}
                        mapOptionToString={(o) => o.label}
                        options={options}
                        name="input-overrides"
                        overrides={{
                          Input: {
                            props: {
                              placeholder: "All Sizes",
                            },
                          },
                        }}
                      />
                    </Cell>
                    {/* SELECT BRAND */}
                    <Cell span={3}>
                      <div style={{ textAlign: "left" }}>
                        <Label1>Brand :</Label1>
                      </div>
                    </Cell>
                    <Cell span={3}>
                      <Combobox
                        value={value}
                        onChange={setValue}
                        mapOptionToString={(o) => o.label}
                        options={options}
                        name="input-overrides"
                        overrides={{
                          Input: {
                            props: {
                              placeholder: "Brand",
                            },
                          },
                        }}
                      />
                    </Cell>
                    {/* SELECT PRICE */}
                    <Cell span={3}>
                      <div style={{ textAlign: "center" }}>
                        <Label1>Price :</Label1>
                      </div>
                    </Cell>
                    <Cell span={3}>
                      <Range
                        step={0.1}
                        min={0}
                        max={100}
                        values={state.values}
                        onChange={(values) => {
                          setState({ values });
                          console.log(values);
                        }}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "6px",
                              width: "100%",
                              backgroundColor: "#ccc",
                            }}
                          >
                            {children}
                          </div>
                        )}
                        allowOverlap={true}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "20px",
                              width: "20px",
                              backgroundColor: "#999",
                            }}
                          />
                        )}
                      />
                    </Cell>
                    {/* SELECT LOCATION */}
                    <Cell span={3}>
                      <div style={{ textAlign: "left" }}>
                        <Label1>Location :</Label1>
                      </div>
                    </Cell>
                    <Cell span={3}>
                      <Combobox
                        value={value}
                        onChange={setValue}
                        mapOptionToString={(o) => o.label}
                        options={options}
                        name="input-overrides"
                        overrides={{
                          Input: {
                            props: {
                              placeholder: "City/State",
                            },
                          },
                        }}
                      />
                    </Cell>
                    {/* SELECT DATE */}
                    <Cell span={3}>
                      <div style={{ textAlign: "center" }}>
                        <Label1>Location :</Label1>
                      </div>
                    </Cell>
                    <Cell span={3}>
                      <DatePicker
                        selected={startDate}
                        onChange={(value) => setStartDate(value)}
                      />
                    </Cell>
                    <Cell skip={6} span={1} align={"end"}>
                      <button>Search</button>
                    </Cell>
                  </Grid>
                </div>
              </a>
            </Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link href="/">
              <a>Sell your tent</a>
            </Link>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <div style={{ paddingRight: "3rem" }}>
              {/* { user && <Menu title='Menu' items={items} />}      */}
            </div>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </>
  );
};
