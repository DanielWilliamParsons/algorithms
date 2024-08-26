
// Priority Queue

// In this case, let's take objects into the array as follows
// { patient: "...", severity: "...", timeAdmitted: "..." }
// Order first by severity, then by timeAdmitted

// End of the array is the first one out

const PriorityQueueModule = (() => {

    'use strict';

    const priorityQueue = () => {
        let queue = [];

        return {
            insertItem: (patient) => {
                queue.push(patient);
                if(queue.length >= 2){
                    queue.sort((patientA, patientB) => {
                        if (patientA.severity === patientB.severity) {
                            return patientB.timeAdmitted - patientA.timeAdmitted;
                        }
                        return patientA.severity - patientB.severity;
                    });
                }
                
            },

            popItem: () => {
                if(queue.length > 0){
                    return(queue.pop());
                } else {
                    return undefined;
                }
            },

            readItem: () => {
                if(queue.length > 0) {
                    return (queue[queue.length-1]);
                } else {
                    return undefined;
                }
            },

            readAllItems: () => {
                for(let item of queue){
                    console.log(item);
                }
            }
        }
    }

    return priorityQueue;

})();

let patient1 = { 'patient': "A", 'severity': 3, 'timeAdmitted': new Date("August 26, 2024 16:49") };
let patient2 = { 'patient': "B", 'severity': 4, 'timeAdmitted': new Date("August 26, 2024 16:50") };
let patient3 = { 'patient': "C", 'severity': 7, 'timeAdmitted': new Date("August 26, 2024 16:51") };
let patient4 = { 'patient': "D", 'severity': 1, 'timeAdmitted': new Date("August 26, 2024 16:51") };
let patient5 = { 'patient': "E", 'severity': 1, 'timeAdmitted': new Date("August 26, 2024 16:52") };
let patient6 = { 'patient': "F", 'severity': 1, 'timeAdmitted': new Date("August 26, 2024 16:54") };
let patient7 = { 'patient': "G", 'severity': 10, 'timeAdmitted': new Date("August 26, 2024 16:55") };
let patient8 = { 'patient': "H", 'severity': 3, 'timeAdmitted': new Date("August 26, 2024 16:56") };
let patient9 = { 'patient': "I", 'severity': 3, 'timeAdmitted': new Date("August 26, 2024 16:57") }; 

const myQueue = PriorityQueueModule();
myQueue.insertItem(patient1);
myQueue.insertItem(patient2);
myQueue.insertItem(patient3);
myQueue.insertItem(patient4);
myQueue.insertItem(patient5);
myQueue.insertItem(patient6);
myQueue.insertItem(patient7);
myQueue.insertItem(patient8);
myQueue.insertItem(patient9);
myQueue.readAllItems();
myQueue.popItem();
myQueue.readAllItems();
