function getFormattedDate() {
    var d = new Date();
  
    d =
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2) +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2);
  
    return d;
  }

  function compareTimes(a, b) {
    const firstCreatedTime = a.date;
    const secondCreatedTime = b.date;
    let comparison = 0;
    if (firstCreatedTime > secondCreatedTime) {
      comparison = 1;
    } else if (firstCreatedTime < secondCreatedTime) {
      comparison = -1;
    }
    return comparison;
  }