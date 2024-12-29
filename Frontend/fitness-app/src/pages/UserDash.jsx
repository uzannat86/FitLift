import React from "react";
import OurCoaches from "../pages/OurCoaches";
import MyPlan from "../components/MyPlan";
import YourProgress from "../components/YourProgress";
import LaterComponents from "../components/LaterComponents";

function UserDash() {
  return (
    <div className="p-8">
      {/* Additional dashboard content */}
      <div className="mt-2 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Welcome to your dashboard</h2>
        <p>Explore coaches, manage your workouts, and track your progress.</p>
      </div>

      {/* MyPlan component on top */}
      <div className="mb-2">
        <MyPlan />
      </div>

      {/* Coach Cards below MyPlan */}
      <div>
        <OurCoaches />
      </div>
      {/* Progress Field */}
      <div>
        <YourProgress />
      </div>
      {/* Progress Field */}
      <div>
        <LaterComponents />
      </div>
    </div>
  );
}

export default UserDash;
