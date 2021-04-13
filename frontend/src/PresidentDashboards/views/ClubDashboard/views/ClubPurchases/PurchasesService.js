import axios from "axios";
import qs from 'qs';

export function uploadDataToDB(data) {
    console.log('smerah',data);
    axios({
        method: 'post',
        url: '/api/club-purchases',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) =>{
          alert('data added');
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}
export function deleteDataFromDB(id) {
  axios({
      method: 'delete',
      url: `/api/club-purchases/${id}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
        alert('data deleted');
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}
export async function getClubInfo(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
          return  res.data.clubInfo
}

export async function getClub(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
          return  res.data;
}
export async function getEvent() {
  const res = await axios('/api/club/?id=604ea20dd0367415e82112af');
          return  res.data.event;
}
export async function getPurchases() {
  const res = await axios('/api/club-purchases');
          return  res.data;
}

//memberInfo