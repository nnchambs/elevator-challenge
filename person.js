export default class Person {
  constructor(name, currentFloor, requestedFloor) {
    this.name = name;
    this.request = {
      currentFloor: currentFloor,
      requestedFloor: requestedFloor
    };
  }
}
