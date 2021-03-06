import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;