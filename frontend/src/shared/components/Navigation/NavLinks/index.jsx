import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../core/hooks/useAuth";
import { List } from "./styles";

const NavLinks = () => {
  const { userId, isLogged, logout } = useAuth();

  return (
    <List>
      <li>
        <NavLink exact='true' to='/'>
          All Users
        </NavLink>
      </li>
      {isLogged && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
      )}
      {isLogged && (
        <li>
          <NavLink to='/places/new'>Add Place</NavLink>
        </li>
      )}

      {isLogged ? (
        <li>
          <NavLink to='/auth' onClick={logout}>
            Logout
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to='/auth'>Auth</NavLink>
        </li>
      )}
    </List>
  );
};

export default NavLinks;
