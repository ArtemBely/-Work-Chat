import axios from 'axios';

async function getData() {
  return await axios.get('http://localhost:8888/api/profilefast')
  .then(res => {
    let info = res.data;
    return info;
  })
  .catch(err => console.log(err));
}

getData()
.then(info => info)
.catch(err => console.log(err));

export { getData };
