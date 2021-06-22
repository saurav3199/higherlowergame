import "./styles.css";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Users from "./users.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import { red, green, blue } from "@material-ui/core/colors";

const Users = ({users}) => {

  return (
    <Container className="container">
      <List className="userList">
        {
        Users.map((user) => {
          if (user.glow === "right") {
            return (
              <ThemeProvider>
                <ListItem>
                  <Chip
                    className="userNameright"
                    color="primary"
                    // style={{ backgroundColor: "green" }}
                    avatar={<Avatar>{user.name[0]}</Avatar>}
                    label={user.name}
                    onClick={handleClick}
                    variant={user.variant}
                  />
                </ListItem>
              </ThemeProvider>
            );
          } else if (user.glow === "wrong") {
            return (
              <>
                <ListItem>
                  <Chip
                    className="userNamewrong"
                    color="secondary"
                    // style={{ backgroundColor: "red" }}
                    avatar={<Avatar>{user.name[0]}</Avatar>}
                    label={user.name}
                    onClick={handleClick}
                    variant={user.variant}
                  />
                </ListItem>
              </>
            );
          }
        })}
      </List>
      </Container>
  )
}

export default Users;