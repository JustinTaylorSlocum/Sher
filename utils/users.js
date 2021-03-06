const users = [];

// Join user to chat
const userJoin = ( id, username, color ) => {
  const user = { id, username, color };

  users.push(user);
  return user;
}
 
// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getUsers(room) {
    console.log(users);
    return users;
  }

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getUsers,
};