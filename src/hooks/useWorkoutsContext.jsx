import { useContext } from "react";

import { WorkoutsContext } from "../context/WorkoutContext";

function useWorkoutsContext() {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkoutsContext must be inside an WorkoutsContextProvider");
  }

  return context;
}

export default useWorkoutsContext;
