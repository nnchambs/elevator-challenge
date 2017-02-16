export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = [];
    this.riders = [];
    this.floorTotal = 0;
    this.state = 'idle';
    this.stops = 0;
  };

  moveUp() {
    this.countFloorTotal()
    this.setStatus('moving')
    return this.currentFloor++;
  };

  moveDown() {
    this.countFloorTotal();
    this.setStatus('moving')
    return this.currentFloor--;
  };

  stop() {
    this.setStatus('stopped')
  }

  setStatus(string) {
    switch(string) {
      case 'moving':
        return this.state = string;
      case 'stopped':
        return this.state = string;
      default:
        return this.state = 'idle'
    }
  }

  addRider(person) {
    return this.riders.push(person.name)
  }

  addRequest(person) {
    return this.requests.push(person.request)
  };

  countFloorTotal() {
    return this.floorTotal++
  };

  stopsCounter() {
    this.stops++
  }

  requestFloor(person) {
    this.addRequest(person);
  };

  deleteRequest() {
    this.requests.shift()
    this.riders.shift()
  }

  fetchRider() {
    let pickUpFloor = this.requests[0].currentFloor;
    if (pickUpFloor > this.currentFloor) {
      for (let i = this.currentFloor; i < pickUpFloor; i++) {
        this.moveUp();
      }
    } else if (pickUpFloor < this.currentFloor) {
        for (let i = this.currentFloor; i > pickUpFloor; i--) {
          this.moveDown();
        }
    } else if (pickUpFloor === this.currentFloor) {
      this.addRider()
      this.stopsCounter()
    }
  };

  dropOffRider() {
    let dropOffFloor = this.requests[0].requestedFloor;
    if (dropOffFloor > this.currentFloor) {
      for (let i = this.currentFloor; i < dropOffFloor; i++) {
        this.moveUp();
        this.state = 'moving'
      }
    } else if (dropOffFloor < this.currentFloor) {
        for (let i = this.currentFloor; i > dropOffFloor; i--) {
          this.moveDown();
          this.state = 'moving'
        }
    } else if (dropOffFloor === this.currentFloor) {
      this.stopsCounter()
      this.deleteRequest()
      this.state = 'stopped'
    }
  };

  // switchStatus() {
  //   switch () {
  //
  //   }
  //
  // }



//pickUpFloor and dropOffFloor
//stop and move
//switch statement for


  reset() {
    this.constructor()
  }
}
