import React from "react";

const LaterComponents = () => {
  return (
    <div className="p-4 flex w-full flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Steps Today Card */}
      <div className="p-4 card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
        <h3 className="text-lg font-semibold">Steps Today</h3>
        <progress
          className="progress progress-success w-full p-2"
          value="0"
          max="100"
        ></progress>
        <p className="text-sm text-gray-500">0 steps</p>
      </div>

      {/* Calorie Calculator Card */}
      <div className="p-4 card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
        <h3 className="text-lg font-semibold">Calorie Calculator</h3>
        <progress
          className="progress progress-success w-full p-2"
          value="0"
          max="100"
        ></progress>
        <p className="text-sm text-gray-500">0 kcal</p>
      </div>

      {/* Achievements Card */}
      <div className="p-4 card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <progress
          className="progress progress-success w-full p-2"
          value="0"
          max="100"
        ></progress>
        <p className="text-sm text-gray-500">No achievements yet</p>
      </div>
    </div>
  );
};

export default LaterComponents;
