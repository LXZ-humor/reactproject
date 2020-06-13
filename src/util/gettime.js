import { func } from "prop-types";

export function getDate(time){
    if(!time) return
    let data = new Date(time);
    let resData = data.getFullYear()+"-"+getRightTime((data.getMonth()+1))+"-"
                +getRightTime(data.getDate())+" "+getRightTime(data.getHours())+"-"
                +getRightTime(data.getMinutes())+"-"+getRightTime(data.getSeconds())
                return resData;

}
function getRightTime(time){
    return time < 10 ? '0'+time :time
}