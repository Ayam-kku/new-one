import axios from "axios";
import qs from 'qs';

export async function getStudentUser() {
    const res = await axios('/api/users');
    let result = [];
          res.data.forEach((req) => {
              if (req.usertype === "Student") {
                result.push(req);
              } });

            return result;
  }
export function postClubInfo(data) {
    axios({
                    method: 'put',
                    url: '/api/club/6071d194d7edbe148cce1eff',
                    data: qs.stringify(data),
                    headers: {
                      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                  })
                    .then(response =>{
                            console.log(response,"data added ");
                    })
                    .catch(error =>{
                      alert(`Error : + ${error.response.data.message}`);
                    })
            
}

export async function getClubInfo(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
          return  res.data.clubInfo
}

export async function getClub(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
          return  res.data;
}


//memberInfo