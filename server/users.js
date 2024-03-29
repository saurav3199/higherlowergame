const users = [];

const addUser = ({ id, name, room }) => {
  console.log(users)
  if(!name || !room) return { error: 'Username and room are required.' };
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  console.log(name, room)
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, level: 0};
  users.push(user);

  return { user };
}

const updateUserLevel = (id, value) => {
  const user = getUser(id);
  if(!value)
    user.level += 1;
  else
    user.level = value;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
  return {}
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, updateUserLevel };