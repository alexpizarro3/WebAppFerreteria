import { createContext } from "react";

const userContextUsuario = createContext({
  userContext: {
    cedula: null,
  },
  setUserContext: () => {},
});

export default userContextUsuario;