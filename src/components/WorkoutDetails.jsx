import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

function WorkoutDetails({ workout }) {
  const { _id, title, load, reps, createdAt } = workout;

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  function deleteHandler() {
    if (!user) {
      return;
    }
    fetch(`http://localhost:5000/api/workouts/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "DELETE_WORKOUT", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="workout-details" key={_id}>
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span onClick={deleteHandler}>delete</span>
    </div>
  );
}

export default WorkoutDetails;
