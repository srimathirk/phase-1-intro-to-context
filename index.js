// Your code her

function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array [2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    return array.map((row)=>{
        return createEmployeeRecord(row)})
    
}
function createTimeInEvent(employeeRecord,dateStamp){
   let [date,hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour,10),
        date: date
    })
    return employeeRecord
}
function createTimeOutEvent(employeeRecord,dateStamp){
    let [date,hour] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour,10),
        date: date
    })
    return employeeRecord;
 }
function hoursWorkedOnDate(employeeRecord,date){
    const timeIn = employeeRecord.timeInEvents.find(e => e.date ===date)
    const timeOut = employeeRecord.timeOutEvents.find(e=>e.date === date)
    return (timeOut.hour - timeIn.hour)/100
}
function wagesEarnedOnDate(employeeRecord,date){
    return (hoursWorkedOnDate(employeeRecord,date)*employeeRecord.payPerHour)
}
function allWagesFor(employeeRecord){
    const allWages = employeeRecord.timeInEvents.map(e=>e.date)
    let pays = allWages.reduce((total,date)=>{
    return  total + wagesEarnedOnDate(employeeRecord,date);
    },0)
    return pays
}
function calculatePayroll(array){
    return array.reduce((total,record)=>{return total+allWagesFor(record)},0)
}