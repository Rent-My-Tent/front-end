import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Combobox } from "baseui/combobox";
import { Slider } from "baseui/slider";
import { LabelMedium } from "baseui/typography";

export default () => {
  const [value, setValue] = React.useState("");
  const [value_slider, setValue_slider] = React.useState([25, 75]);

  return (
    <div style={{ width: "800px", background: "white", paddingTop: '2rem' }}>
      <Grid 
        gridGaps={30}
        align={ALIGNMENT.center}
      >
        {/* SELECT CATEGORY */}
        <Cell span={2}>
          <LabelMedium>Category</LabelMedium>
        </Cell>
        <Cell span={4}>
          <Combobox
            value={value}
            onChange={(nextValue) => setCategory(nextValue)}
            options={[
              { title: "AliceBlue", id: "#F0F8FF" },
              { label: "AntiqueWhite", id: "#FAEBD7" },
              { label: "Aqua", id: "#00FFFF" },
              { label: "Aquamarine", id: "#7FFFD4" },
              { label: "Azure", id: "#F0FFFF" },
              { label: "Beige", id: "#F5F5DC" },
            ]}
            mapOptionToString={(option) => option.label}
          />
        </Cell>
        {/* SELECT SIZE */}
        <Cell span={2}>
          <LabelMedium>Capability</LabelMedium>
        </Cell>
        <Cell span={4}>
          <Combobox
            value={value}
            onChange={(nextValue) => setCategory(nextValue)}
            options={[
              { title: "AliceBlue", id: "#F0F8FF" },
              { label: "AntiqueWhite", id: "#FAEBD7" },
              { label: "Aqua", id: "#00FFFF" },
              { label: "Aquamarine", id: "#7FFFD4" },
              { label: "Azure", id: "#F0FFFF" },
              { label: "Beige", id: "#F5F5DC" },
            ]}
            mapOptionToString={(option) => option.label}
          />
        </Cell>
            <Cell span={12}><hr/></Cell>
        {/* SELECT BRAND */}
        <Cell span={2}>
          <LabelMedium>Brand</LabelMedium>
        </Cell>
        <Cell span={4}>
          <Combobox
            value={value}
            onChange={(nextValue) => setCategory(nextValue)}
            options={[
              { title: "AliceBlue", id: "#F0F8FF" },
              { label: "AntiqueWhite", id: "#FAEBD7" },
              { label: "Aqua", id: "#00FFFF" },
              { label: "Aquamarine", id: "#7FFFD4" },
              { label: "Azure", id: "#F0FFFF" },
              { label: "Beige", id: "#F5F5DC" },
            ]}
            mapOptionToString={(option) => option.label}
          />
        </Cell>
        {/* SELECT PRICE*/}
        <Cell span={2}>
          <LabelMedium>Price</LabelMedium>
        </Cell>
        <Cell span={4}>
          <Slider
            value={value_slider}
            onChange={({ value }) => value && setValue_slider(value)}
          />
        </Cell>
      </Grid>
    </div>
  );
};
