const generateMessage = (user, message) => {
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let hours = hour < 10 ? "0" + hour : hour;
  let minutes = minute < 10 ? "0" + minute : minute;
  if (hours < 12) {
    date = hours + ":" + minutes + " am";
  } else {
    date = hours + ":" + minutes + " pm";
  }

  return {
    user,
    message,
    createdAt: date,
  };
};
const generateLocationMessage = (user, url) => {
  let date = new Date().getDate;
  let month = new Date().getMonth;
  let hours = new Date().getHours;
  let minutes = new Date().getMinutes;

  const time = hours + minutes;

  console.log(time);
  return {
    user,
    url,
    createdAt: time,
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
