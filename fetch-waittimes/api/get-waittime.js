import { parseISO, closestTo } from "date-fns";

const dl = "../waittimes/dl.json";
const ca = "../waittimes/ca.json";

module.exports = (req, res) => {
  console.log("query");
  console.log(req.query);
  const { id, time, park } = req.query;
  let parkObj;
  if (park.includes("california")) {
    console.log("using california adventure");
    parkObj = ca;
  } else {
    console.log("using disneyland");
    parkObj = dl;
  }
  let timesISO = Object.keys(parkObj);
  let times = [];
  for (let i = 0; i < timesISO.length; i++) {
    times.push(parseISO(timesISO[i]));
  }
  let parsedTime = parseISO(time);
  console.log("parsed time");
  console.log(parsedTime);
  let closestTime = closestTo(parsedTime, times);
  console.log("closest time");
  console.log(closestTime);
  let result = parkObj[closestTime.toISOString()][id]
  console.log("result");
  console.log(result);

  res.json({
    ...result
  })
}
