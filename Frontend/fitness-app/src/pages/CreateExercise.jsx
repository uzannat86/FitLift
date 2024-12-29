import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { useAuth } from "../context/AuthProvider";

function CreateExercise() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const userRole = localStorage.getItem("userRole");

  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // State to hold error messages and loading status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading spinner

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (mediaFile) data.append("media", mediaFile);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exercises/create`, // Adjust the API endpoint as needed
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        // Redirect or perform any action after successful submission
        navigate("/ExercisePool"); // Adjust the route as needed
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Exercise creation failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Handle navigation to previous page or dashboard
  const handleNavigateBack = () => {
    navigate(userRole === "Coach" ? "/CoachDash" : "/UserDash"); // Adjust the route as needed
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <p className="text-2xl font-semibold text-center mb-6">Create Exercise</p>

      {error && (
        <div
          className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Conditionally render loading spinner or form */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClimbingBoxLoader color="#4A90E2" loading={loading} size={15} />
        </div>
      ) : (
        <form
          className="max-w-md mx-auto"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Title */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer"
              placeholder="Title"
              required
            />
          </div>

          {/* Description */}
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer"
              placeholder="Description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="media"
              onChange={handleFileChange}
              className="block py-2.5 px-2 w-full text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 peer"
              accept="image/*,video/*"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Create Exercise
          </button>
        </form>
      )}

      <div className="my-6 border-t border-gray-300"></div>

      <div className="flex justify-center">
        <button
          onClick={handleNavigateBack}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CreateExercise;
