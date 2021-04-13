import axios from "axios";
import qs from 'qs';

export async function getClub(_id) {
    const res = await axios(`/api/club/?id=${_id}`);
            return  res.data;
  }