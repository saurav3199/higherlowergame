import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import "./Users.css";
import { red, green, blue } from "@material-ui/core/colors";

const handleClick = () => {};
const Users = ({ users }) => {
  console.log("THis is from users,", users);
  return (
    <Container className="container">
      <List className="userList">
        {users.map((user) => {
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
                  variant="outline"
                />
              </ListItem>
            </>
          );
        })}
      </List>

      <div className="App">
        <h1 className="titles">Hi Players!</h1>
        <h2 className="titles">Edit to see some magic happen!</h2>
      </div>
    </Container>
  );
};

export default Users;
