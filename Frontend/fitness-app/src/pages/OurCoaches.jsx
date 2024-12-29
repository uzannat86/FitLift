import React, { useState, useEffect } from "react";
import axios from "axios";
import CoachCard from "../components/CoachCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../context/AuthProvider";
import BookingModal from "../components/BookingModal";
import toast from "react-hot-toast";

function OurCoaches() {
  const { isLoggedIn } = useAuth();
  const [coachData, setCoachData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          { withCredentials: true }
        );

        const filteredCoaches = response.data.filter(
          (user) => user.role === "Coach" && user.ads.length > 0
        );
        setCoachData(filteredCoaches);
      } catch (error) {
        console.error("Error fetching coaches:", error);
        setError("Failed to load coaches");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCoaches();
    }
  }, [isLoggedIn]);

  const handleBookCoach = (coach) => {
    setSelectedCoach(coach);
  };

  const handleCloseModal = () => {
    setSelectedCoach(null);
  };

  const handleSendRequest = async (message) => {
    setIsSendingRequest(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/coaches/${selectedCoach._id}/book`,
        { message },
        { withCredentials: true }
      );
      toast.success("Booking request sent successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error sending booking request:", error);
      toast.error("Failed to send booking request");
    } finally {
      setIsSendingRequest(false);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3.5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2.5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1.5,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.2,
      slidesToSlide: 1,
    },
  };

  if (!isLoggedIn) return <p>Please log in to view coaches.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Our Coaches</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        showDots={false}
        swipeable={true}
        draggable={true}
        containerClass="w-full"
        itemClass="px-4"
      >
        {coachData.map((coach) =>
          coach.ads.map((ad) => (
            <CoachCard
              key={ad._id}
              coach={{
                name: coach.name,
                description:
                  ad.bio.length > 50
                    ? `${ad.bio.substring(0, 50)}... `
                    : ad.bio,
                imgUrl: ad.photo,
                price: ad.price,
                onBookCoach: () => handleBookCoach(coach),
              }}
            />
          ))
        )}
      </Carousel>
      <BookingModal
        isOpen={!!selectedCoach}
        onClose={handleCloseModal}
        onSendRequest={handleSendRequest}
        coach={selectedCoach}
        isSendingRequest={isSendingRequest}
      />
    </div>
  );
}

export default OurCoaches;
