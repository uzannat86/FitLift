import React from "react";

const YourProgress = () => {
  return (
    <div className="w-3/4 p-6 space-y-6 bg-base-300 rounded-lg shadow-md flex flex-col justify-center mx-auto">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Your Progress
      </h2>

      <div className="flex justify-center space-x-8">
        {/* Horizontal Progress Bar */}
        <div className="flex flex-col items-center space-y-2 w-full">
          <progress
            className="progress progress-success w-full"
            value="0"
            max="100"
          ></progress>
          <span className="text-gray-600">Overall Progress</span>
        </div>

        {/* Radial Progress 
        <div
          className="radial-progress bg-gray-600 text-primary"
          style={{ "--value": 0 }}
          role="progressbar"
        >
          0%
        </div>*/}
      </div>

      {/* Statistics Section */}
      <div className="stats bg-primary text-primary-content shadow-lg rounded-lg">
        <div className="stat">
          <div className="stat-title">Current Goals</div>
          <div className="stat-value">0%</div>
          <div className="stat-actions">
            <button className="btn btn-sm btn-success">Set Goals</button>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Exercises Completed</div>
          <div className="stat-value">0</div>
          <div className="stat-actions">
            <button className="btn btn-sm">View Log</button>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Workout Sessions</div>
          <div className="stat-value">0</div>
          <div className="stat-actions">
            <button className="btn btn-sm">Start New Session</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProgress;
