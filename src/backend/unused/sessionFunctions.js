function setSessionItems() {
  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('name','Shahid');
    sessionStorage.setItem('city','Mumbai');
    sessionStorage.setItem('country','India');
    console.log('data added in session storage');
  } else {
    console.log('session storage not supported');
  }
}

module.exports = {setSessionItems}