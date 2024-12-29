// ExerciseCard.jsx

import React, { useRef } from "react";

function ExerciseCard({ exercise, onCardClick }) {
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    // Wrap the entire card in a clickable div or button
    <div
      className="flex aspect-[2/3]"
      onClick={() => {
        if (onCardClick) {
          onCardClick(exercise);
        }
      }}
    >
      <div className="card bg-white border border-gray-200 w-96 shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <figure>
          <img
            className="w-full"
            src={exercise.media || "/favicon.svg"}
            alt={`${exercise.title} image`}
          />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            {exercise.title}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
            {exercise.description.length > 100
              ? `${exercise.description.substring(0, 100)}...`
              : exercise.description}
          </p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={openModal}>
              Read more
            </button>
          </div>
        </div>

        {/* Modal to show full exercise details */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <img
              src={exercise.media || "/favicon.svg"}
              alt={`${exercise.title} image`}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg">{exercise.title}</h3>
            <p className="py-4">{exercise.description}</p>
          </div>
          {/* This form acts as the backdrop. Clicking it closes the modal */}
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}

export default ExerciseCard;
