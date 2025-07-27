let navigate;

export const setNavigator = (nav) => {
  navigate = nav;
};

export const goToLogin = () => {
  if (navigate) navigate("/auth/login");
};

export const goTo403 = () => {
  if (navigate) navigate("/error/403");
};