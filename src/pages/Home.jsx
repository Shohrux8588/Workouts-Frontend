import React, { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchWorkouts(token) {
      const response = await fetch("http://localhost:5000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    }

    if (user) {
      fetchWorkouts(user.token);
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
