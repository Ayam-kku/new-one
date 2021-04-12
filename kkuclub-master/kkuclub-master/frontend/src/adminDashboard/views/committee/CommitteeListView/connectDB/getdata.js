import axios from "axios";

export const getData = async () => {
  const res = await axios('/api/Committee');
  return res.data;
}

export const getDataCollege = async () => {
  const res = await axios('/api/college');
  return res.data;
}



export default getData;
