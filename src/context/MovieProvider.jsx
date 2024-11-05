import { createContext, useState } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import Modal from "react-modal"; // Corrected import to match typical usage

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => { // Fixed the destructuring syntax
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey('');
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Ensure this environment variable is set
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data.results.length > 0) { // Check if there are results before accessing
        setTrailerKey(data.results[0].key);
        setModalIsOpen(true);
      } else {
        console.error("No trailer found");
      }
    } catch (error) {
      console.error(error); // Improved error logging
      setModalIsOpen(false);
    }
  };

  return (
    <MovieContext.Provider value={{ handleTrailer }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Trailer Modal" // Updated content label for clarity
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired, // Marking children as required
};

export { MovieProvider, MovieContext };
