import axios from "axios";
import qs from 'qs';


export async function getEvent(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
    return  res.data.event;
}

export async function getClub(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
    return  res.data;
}

export async function getMember(_id) {
    const res = await axios(`/api/club/?id=${_id}`);
      return  res.data.member;
}

export const getType = async () => {
  const res = await axios('/api/Event-Type');
  return res.data;
}

export async function getBudget(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
  let value = 0;
    for (let index = 0; index < res.data.event.length; index++) {
      value += parseInt(res.data.event[index].eventbudget);
    }
    return value;
}


export async function getMon(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
  let value = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let index = 0; index < res.data.event.length; index++) {
      const val = new Date(parseInt(res.data.event[index].evenTime)).getMonth();
      value[val]++;
    }
    return value;
}

export async function getBudgetByType(_id) {
  const res = await axios(`/api/club/?id=${_id}`);
  let type = [];
  let value = [];
  type = [];
  value = [];
    for (let index = 0; index < res.data.event.length; index++) {
      const val = parseInt(res.data.event[index].eventbudget);
      const typ = res.data.event[index].eventType.name;
      let int = -1;
      type.forEach(function(element,index2) {
        if (typ === element) {
          value[index2] += val;
          int = index;
        }
    });
    if (int === -1) {
    type[index] = typ;
    value[index] = val;
    }        
  }
    
  let filteredValue = value.filter(function (el) {
    return el != null;
  });

  let filteredType = type.filter(function (el) {
    return el != null;
  });

    return [filteredValue,filteredType];
}

//memberInfo