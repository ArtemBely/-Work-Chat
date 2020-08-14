import axios from 'axios';

async function getData() {
  return await axios.get('https://ourworkchat.herokuapp.com/api/profilefast')
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
