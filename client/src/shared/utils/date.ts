const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export default function getDayStr(date: Date){
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}

export function getTime(date: Date){
    return `${date.getHours()}:${date.getMinutes()}`
}