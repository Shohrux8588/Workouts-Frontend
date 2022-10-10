import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

function useLogout() {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  function logout() {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    authDispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  }
  return { logout };
}

export default useLogout;
