import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Block } from "baseui/block";
import RenderTentsList from "../components/RenderTentsList";
import { H2 } from "baseui/typography";
import SearchField from "../components/SearchField";
import LoginAndCreate from "../components/LoginAndCreate";
import { useUser } from "../utils/hooks";

export default (props) => {
  
  const user = useUser();

  console.log(user)

  return (
    <>
      <Block className="py-2">
        <Block id="box-image">
          <H2>The circular economy for tents.</H2>
        </Block>
        <Grid gridGutters={20}>
          <Cell span={6}><SearchField /></Cell>

          <Cell span={6}><LoginAndCreate /></Cell>
        </Grid>
      </Block>
      
      <RenderTentsList />
    </>
  );
};
