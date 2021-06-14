const Users = ({users}) => {

  return (
    <div>
      {users.map( ( user ) => (
        <li key={user.id} >
          {user.name}
        </li>
        ))
      }
    </div>
  )
}

export default Users;