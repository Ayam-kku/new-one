import axios from "axios";
import qs from 'qs';



export async function getCollege() {
  const res = await axios('/api/college');
          return res.data;
}

export function postMemoerToEvent(data) {
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
export function postNewStudent(data) {
  axios({
                  method: 'post',
                  url: '/api/users',
                  data: qs.stringify(data),
                  headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                  }
                })
                  .then(response =>{
                    alert("data added")
                  })
                  .catch(error =>{
                    alert(`Error : + ${error.response.data.message}`);
                  })
          
}