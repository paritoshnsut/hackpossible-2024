import axios from 'axios';

export const fetchReadingById = async (id) => {
  try {
    const response = await axios.get(
      `https://whispering-falls-89690-7597f8f3ebb3.herokuapp.com/api/v1/reading/${id}/10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchHeatmapData = async () => {
  try {
    const response = await axios.post('https://whispering-falls-89690-7597f8f3ebb3.herokuapp.com/api/v1/graph/heatmap?precision=3');
    return response.data;
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    throw error;
  }
};
