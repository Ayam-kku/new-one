import axios from "axios";

async function getData() {
  const res = await axios('/api/users');
  return res.data;
}

export async function getDataUsers() {
  const res = await axios('/api/users');
  return res.data.slice(-6,res.data.length);
}

export async function getDataDepartment() {
  const res = await axios('/api/department');
  return res.data.slice(-6,res.data.length);
}

export async function getDataDepartmentTotal() {
  const res = await axios('/api/department');
  return res.data;
}

export const getDataCollegeTotal = async () => {
  const res = await axios('/api/college');
  return res.data;
}

export const getDataCollege = async () => {
  const res = await axios('/api/college');
  return res.data.slice(-5,res.data.length);
}

export async function getTotal() {
  const res = await axios('/api/users');
  let admin = 0;
  let dean = 0;
  let SAU = 0;
  let student = 0;
  let staff = 0;

  let array = [];
    res.data.forEach((req) => {

      if (req.usertype === "admin") {
        admin++;
      } });

      res.data.forEach((req) => {
        if (req.usertype === "Dean") {
          dean++;
        } });

        res.data.forEach((req) => {
          if (req.usertype === "Student Activity Unit") {
            SAU++;
          } });

        res.data.forEach((req) => {
            if (req.usertype === "Student") {
              student++;
            } });  

        res.data.forEach((req) => {
            if (req.usertype === "Staff") {
              staff++;
        } });   

        const total = admin + dean + SAU + student + staff;
        array = [admin,dean,SAU,student,staff,total];
          return array;
}

export default getData;