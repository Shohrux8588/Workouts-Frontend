import React, { useState } from "react";

import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  async function submitHandler(e) {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const workout = { title, load, reps };
    if (title.trim().length > 0 && Number(load) > 0 && Number(reps) > 0) {
      fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "CREATE_WORKOUT", payload: data });
          setTitle("");
          setLoad("");
          setReps("");
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    } else {
      console.log("Error");
    }
  }
  return (
    <div>
      <form className="create" onSubmit={submitHandler}>
        <h3>Add a New Workout</h3>
        <label htmlFor="title">Exercise Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="title">Load (in kg):</label>
        <input
          type="number"
          id="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <button type="submit">Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
