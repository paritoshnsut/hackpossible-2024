import axios from 'axios';

const fetchReadingById = async (id) => {
  try {
    const response = await axios.get(
      `https://whispering-falls-89690-7597f8f3ebb3.herokuapp.com/api/v1/reading/${id}/10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchReadingById;
