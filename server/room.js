const rooms = {};


const getCurrentTime = () => {
  return new Date().getTime();
}



const setRoom = ({roomId, time}) => {
  if(!time)
    room[roomId] = getCurrentTime();
  else
    room[roomId] += 30000; // 30 seconds for each round
    return room[id] 
}