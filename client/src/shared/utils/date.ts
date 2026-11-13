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
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
}

export function getFullDate(date: Date){
    return `${getDayStr(date)} ${getTime(date)}`
}

export function isDifferentDay(d1?: Date | string, d2?: Date | string){
    if (!d1 || !d2) return true;
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return (
        date1.getFullYear() !== date2.getFullYear() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getDate() !== date2.getDate()
    );
};