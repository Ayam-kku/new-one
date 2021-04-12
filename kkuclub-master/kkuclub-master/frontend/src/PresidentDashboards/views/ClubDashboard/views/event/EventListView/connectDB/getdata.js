import axios from "axios";

export const getDataCollege = async () => {
  const res = await axios('/api/college');
  return res.data;
}

export const getDataClub = async () => {
  const res = await axios('/api/club/');

  return res.data;
}

export async function getAll() {
  const res = await axios('/api/users');
  return res.data;
}

export async function getStudent() {
    const res = await axios('/api/users');
    let userPre = [];
        res.data.forEach((req) => {
            if (req.usertype === "Student") {
              userPre.push(req);
            } });     

          return userPre;
}

export async function getStaff() {
  const res = await axios('/api/users');
  let userPion = [];  

      res.data.forEach((req) => {
          if (req.usertype === "Staff") {
            userPion.push(req);
      } });   

        return userPion;
}
