import axios from "axios";
import qs from 'qs';




export async function getMemberArray() {
  const res = await axios('/api/club/?id=6071d194d7edbe148cce1eff');
  
          return res.data.member.length;
}

export async function getEventArray() {
  const res = await axios('/api/club/?id=6071d194d7edbe148cce1eff');
  
          return res.data.event.length;
}
export async function getClubArray() {
  const res = await axios('/api/club');
  
          return res.data.length;
}

export async function getAllEventArray() {
  const res = await axios('/api/club/?id=6071d194d7edbe148cce1eff');
        return res.data.event;
}

export async function getAllClub() {
  const res = await axios('/api/club');
        return res.data;
}

export async function getCommittee() {
  const res = await axios('/api/committee');
  let result = [];
        res.data.forEach((req) => {
            result.push(req);
            });
          return result;
}

export async function getEventType() {
  const res = await axios('/api/event-type');
          return res.data;
}




export async function getStudentUser() {
  const res1 = await axios('/api/club/?id=6071d194d7edbe148cce1eff');
  let result1 = [];
        res1.data.member.forEach((req) => {     
            result1.push(req.memberInfo.name);
            });
            console.log(result1);
  const res = await axios('/api/users');
  let result = [];
        res.data.forEach((req) => {
            if (req.usertype === "Student" && (!result1.includes(req.name))) {
              result.push(req);
            } });

          return result;
}