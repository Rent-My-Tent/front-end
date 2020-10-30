import { Label2 } from "baseui/typography";
import { useStyletron } from "baseui";

export default ({ children }) => {
  const [css, theme] = useStyletron();

  const styles = css({
    paddingBottom: theme.sizing.scale300,
  });

  return <Label2 className={styles}>{children}</Label2>;
};
