import axios from "axios";

const getData = async () => {
  const res = await axios('/api/college');
  return res.data;
}

export default getData;
