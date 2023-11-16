// Your code here
function createEmployeeRecord([first, family, emptitle, payrate]) {
    let newRecord = {
        firstName: first,
        familyName: family,
        title: emptitle,
        payPerHour: payrate,
        timeInEvents: [],
        timeOutEvents: [],
    }
    return newRecord
}

function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(newRecord, datestamp) {
    let newTimeInEvent = {
        type: "TimeIn",
        date: datestamp.substring(0, 10),
        hour: parseInt(datestamp.substring(11))
    }
    let events = newRecord.timeInEvents
    events.push(newTimeInEvent)
    return (newRecord)
}

function createTimeOutEvent(newRecord, datestamp) {
    let newTimeOutEvent = {
        type: "TimeOut",
        date: datestamp.substring(0, 10),
        hour: parseInt(datestamp.substring(11))
    }
    let events = newRecord.timeOutEvents
    events.push(newTimeOutEvent)
    return (newRecord)
}

function hoursWorkedOnDate(newRecord, onDate) {
    //Given a date, calculate hours worked - timeOut minus timeIn
    let hours = 0;
    //REVIEW THIS FOR LOOP
    for (let i = 0; i < newRecord.timeInEvents.length; i++) {
        if (newRecord.timeInEvents[i].date === onDate) {
            hours += (newRecord.timeOutEvents[i].hour - newRecord.timeInEvents[i].hour) / 100;
            break; // Exit the loop once the hours are calculated
        }
    }
    return hours;
}

function wagesEarnedOnDate(newRecord, onDate) {
    let hoursWorked = hoursWorkedOnDate(newRecord, onDate)
    return hoursWorked * newRecord.payPerHour
}

function allWagesFor(newRecord) {
    let allWages = 0;
    let allEvents = newRecord.timeInEvents.concat(newRecord.timeOutEvents)
    // let inEvents = newRecord.timeInEvents
    // let outEvents = newRecord.timeOutEvents
    // inEvents.forEach(event => {allEvents.push(event)})
    // outEvents.forEach(event => {allEvents.push(event)})

    allEvents.forEach(event => {
        let dayWages = wagesEarnedOnDate(newRecord, event.date)
        allWages += dayWages / 2
    })
    return allWages
}

function calculatePayroll(arr) {
    //REVIEW THIS REDUCE METHOD - it does the same as the commented-out code below, but more simply
    return arr.reduce((totalPay, record) => {
        let pay = allWagesFor(record);
        return totalPay + pay;
    }, 0);
    //The 0 above is the initial value

    // let totalPay = 0
    // arr.forEach(record =>
    //     {
    //         let pay = allWagesFor(record)
    //         totalPay += pay
    //     })
    // return totalPay
}