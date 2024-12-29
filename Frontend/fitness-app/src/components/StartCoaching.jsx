import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../App.css";
import toast from "react-hot-toast";

function StartCoaching() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    sport_type: "",
    experience: "",
    bio: "",
    photo: null,
    price: "",
  });
  const [uploading, setUploading] = useState(false);
  const [isEditable, setIsEditable] = useState({ currentEditable: "" });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const sportTypeRef = useRef(null);
  const experienceRef = useRef(null);
  const bioRef = useRef(null);
  const photoRef = useRef(null);
  const priceRef = useRef(null);

  const handleDoubleClick = (fieldId) => {
    setIsEditable({ currentEditable: fieldId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const form = new FormData();
    form.append("first_name", formData.firstName);
    form.append("last_name", formData.lastName);
    form.append("sport_type", formData.sportType);
    form.append("experience", formData.experience);
    form.append("bio", formData.bio);
    form.append("price", formData.price);
    if (formData.photo) {
      form.append("photo", formData.photo);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/coaches/create-ad`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Ad created successfully!");
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("Failed to create ad. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        firstNameRef.current &&
        !firstNameRef.current.contains(event.target) &&
        (!lastNameRef.current || !lastNameRef.current.contains(event.target))
      ) {
        setIsEditable({ currentEditable: "" });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex p-6 justify-center">
      <div className="flex flex-col items-center gap-4 bg-base-300 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <p className="text-2xl font-semibold text-center mb-6">
          Start Your Coaching Career
        </p>

        <div className="flex w-full gap-4 mb-3">
          {/* First Name */}
          <label ref={firstNameRef} className="form-control w-full group">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <div className="relative group w-full">
              {!isEditable.currentEditable && (
                <span className="absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity">
                  Double-click to edit
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder={formData.first_name || "Max"}
              className={`input w-full text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === "firstName"
                  ? "input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                  : "input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
              }`}
              name="first_name"
              readOnly={isEditable.currentEditable !== "firstName"}
              onDoubleClick={() => handleDoubleClick("firstName")}
              onChange={handleChange}
            />
          </label>

          {/* Last Name */}
          <label ref={lastNameRef} className="form-control w-full group">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <div className="relative group w-full">
              {!isEditable.currentEditable && (
                <span className="absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity">
                  Double-click to edit
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder={formData.last_name || "Mustermann"}
              className={`input w-full text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === "lastName"
                  ? "input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                  : "input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
              }`}
              name="last_name"
              readOnly={isEditable.currentEditable !== "lastName"}
              onDoubleClick={() => handleDoubleClick("lastName")}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex w-full gap-4 mb-3">
          {/* Sport Type */}
          <label ref={sportTypeRef} className="form-control w-full group">
            <div className="label">
              <span className="label-text">Sport Type</span>
            </div>
            <div className="relative group w-full">
              {!isEditable.currentEditable && (
                <span className="absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity">
                  Double-click to edit
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder={formData.sport_type || "Sport"}
              className={`input w-full text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === "sportType"
                  ? "input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                  : "input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
              }`}
              name="sport_type"
              readOnly={isEditable.currentEditable !== "sportType"}
              onDoubleClick={() => handleDoubleClick("sportType")}
              onChange={handleChange}
            />
          </label>

          {/* Experience */}
          <label ref={experienceRef} className="form-control w-full group">
            <div className="label">
              <span className="label-text">Experience (in years)</span>
            </div>
            <div className="relative group w-full">
              {!isEditable.currentEditable && (
                <span className="absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity">
                  Double-click to edit
                </span>
              )}
            </div>
            <input
              type="number"
              placeholder={formData.experience || "X"}
              className={`input w-full text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === "experience"
                  ? "input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                  : "input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
              }`}
              name="experience"
              readOnly={isEditable.currentEditable !== "experience"}
              onDoubleClick={() => handleDoubleClick("experience")}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Bio */}
        <label ref={bioRef} className="form-control w-full group">
          <div className="label">
            <span className="label-text">Bio</span>
          </div>
          <div className="relative group w-full">
            {!isEditable.currentEditable && (
              <span className="absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity">
                Double-click to edit
              </span>
            )}
          </div>
          <textarea
            placeholder={formData.bio || "Bio not provided"}
            className={`textarea w-full text-2xl font-bold tracking-tight ${
              isEditable.currentEditable === "bio"
                ? "textarea-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                : "textarea-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
            }`}
            name="bio"
            readOnly={isEditable.currentEditable !== "bio"}
            onDoubleClick={() => handleDoubleClick("bio")}
            onChange={handleChange}
          />
        </label>

        {/* Photo Upload */}
        <label
          ref={photoRef}
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG, or GIF (Max. 800x400px)
            </p>
          </div>
          <input
            id="photo-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Price */}
        <label ref={priceRef} className="form-control w-full group">
          <div className="label">
            <span className="label-text">Price (€)</span>
          </div>
          <input
            type="text"
            placeholder={formData.price || "X"}
            className={`input w-full text-2xl font-bold tracking-tight ${
              isEditable.currentEditable === "price"
                ? "input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white"
                : "input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white"
            }`}
            name="price"
            readOnly={isEditable.currentEditable !== "price"}
            onDoubleClick={() => handleDoubleClick("price")}
            onChange={handleChange}
          />
        </label>

        {/* Submit Button */}
        <label className="form-control w-full transform translate-y-4 group">
          <span className="label-text" style={{ visibility: "hidden" }}>
            Price (€)
          </span>
          <button
            type="submit"
            className="text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3.5 text-center"
            disabled={uploading}
          >
            {uploading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </label>
      </div>
    </form>
  );
}

export default StartCoaching;
