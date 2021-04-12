import axios from "axios";
import qs from 'qs';


export function postMemoer(data) {
    axios({
                    method: 'put',
                    url: '/api/club/m/6071d194d7edbe148cce1eff',
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

export async function getMemberArray() {
  const res = await axios('/api/club/?id=6071d194d7edbe148cce1eff');
          if (res.data.statusofplan !== "Edit") {
            return res.data.member;
          }
          else {
            return [];
          }
}


export function deleteDataFromDB(data) {
  axios({
      method: 'put',
      url: '/api/club/d/6071d194d7edbe148cce1eff',
      data: qs.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then((response) =>{
        
        //alert('data deleted');
      })
      .catch((error) =>{
          alert(`Error : + ${error.response.data.message}`);
      });
}

export async function getCommittee() {
  const res = await axios('/api/committee');
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