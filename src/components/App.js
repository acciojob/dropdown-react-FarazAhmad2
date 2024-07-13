import React, { useState, useReducer } from "react";
import "./../styles/App.css";
import states from "./data";

const ACTIONS = {
  STATE_IDX: "state-index",
  CITY_IDX: "city-index",
  LANDMARK_IDX: "landmark-index",
};

const reducer = (index, action) => {
  switch (action.type) {
    case ACTIONS.STATE_IDX:
      return { ...index, state: action.payload, city: 0, landmark: 0 };

    case ACTIONS.CITY_IDX:
      return { ...index, city: action.payload, landmark: 0 };

    case ACTIONS.LANDMARK_IDX:
      return { ...index, landmark: action.payload };

    default:
      return index;
  }
};

function App() {
  const [index, dispatch] = useReducer(reducer, {
    state: 0,
    city: 0,
    landmark: 0,
  });

  const getStateIndex = (e) => {
    dispatch({ type: ACTIONS.STATE_IDX, payload: +e.target.value });
  };

  const getCityIndex = (e) => {
    dispatch({ type: ACTIONS.CITY_IDX, payload: +e.target.value });
  };

  const getLandmarkIndex = (e) => {
    dispatch({ type: ACTIONS.LANDMARK_IDX, payload: +e.target.value });
  };

  return (
    <div id="main">
      <select id="state" onChange={getStateIndex}>
        {states.map((state, index) => (
          <option key={index} value={index}>
            {state.name}
          </option>
        ))}
      </select>
      <select id="city" onChange={getCityIndex}>
        {states[index.state].city.map((city, index) => (
          <option key={index} value={index}>
            {city.name}
          </option>
        ))}
      </select>
      <select id="landmark" onChange={getLandmarkIndex}>
        {states[index.state].city[index.city].landmarks.map(
          (landmark, index) => (
            <option key={index} value={index}>
              {landmark.name}
            </option>
          )
        )}
      </select>
      <div className="cards">
        <div className="card">
          <div id="state-title">{states[index.state].name}</div>
          <div id="state-description">{states[index.state].description}</div>
        </div>

        <div className="card">
          <div id="city-title">{states[index.state].city[index.city].name}</div>
          <div id="city-description">
            {states[index.state].city[index.city].description}
          </div>
        </div>

        <div className="card">
          <div id="landmark-title">
            {
              states[index.state].city[index.city].landmarks[index.landmark]
                .name
            }
          </div>
          <div id="landmark-description">
            {
              states[index.state].city[index.city].landmarks[index.landmark]
                .description
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
