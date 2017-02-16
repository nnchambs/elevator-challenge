require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', function() {
  const elevator = new Elevator();
  const alex = new Person('Alex', 3, 5);
  const meeka = new Person('Meeka', 6, 2)


  it('should be able to moveUp and change the currentFloor', function() {
    elevator.moveUp();
    assert.equal(elevator.currentFloor, 1);
  });

  it('should be able to moveUp and change the currentFloor', function() {
    elevator.currentFloor = 2;
    elevator.moveDown();
    assert.equal(elevator.currentFloor, 1);
  });

  it('should be able to add a rider to its riders array', function() {
    elevator.addRider(alex);
    assert.equal(elevator.riders[0], 'Alex');
  });

  it('should be able to add a request to its requests array', function() {
    elevator.addRequest(alex);
    assert.equal(elevator.requests[0].request.currentFloor, 3);
  });

  it('a person should be able to request a floor', function() {
    elevator.requestFloor(alex);
    assert.equal(elevator.requests[0].request.currentFloor, 3);
    assert.equal(elevator.requests[0].request.requestedFloor, 5);
    assert.equal(elevator.requests.length, 1);
  });

  it('should be able to count the total number of floors traveled', function() {
    elevator.moveUp();
    elevator.moveUp();
    elevator.moveDown();
    assert.equal(elevator.floorTotal, 3);
  });

  it('should be able to fetch alex and bring him to a higher floor once a request is made', function() {
    elevator.currentFloor = 0;
    elevator.requestFloor(alex);
    elevator.fetchRider()
    assert.equal(elevator.floorTotal, 3)
    assert.equal(elevator.currentFloor, 3)
  });

  it('should be able to fetch meeka and bring her to a lower floor once a request is made', function() {
    elevator.currentFloor = 0;
    elevator.requestFloor(meeka);
    elevator.fetchRider()
    assert.equal(elevator.floorTotal, 6)
    assert.equal(elevator.currentFloor, 6)
    assert.equal(elevator.state, 'stopped')
  });

  it('should be able to fetch and dropoff alex once a request is made', function() {
    elevator.currentFloor = 0;
    elevator.requestFloor(alex);
    elevator.fetchRider()
    assert.equal(elevator.floorTotal, 3)
    elevator.dropOffRider();
    assert.equal(elevator.floorTotal, 5)
    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.state, 'stopped')
  });

  it('should be able to fetch and dropoff meeka once a request is made', function() {
    elevator.currentFloor = 0;
    elevator.requestFloor(meeka);
    elevator.fetchRider()
    assert.equal(elevator.floorTotal, 6)
    elevator.dropOffRider();
    assert.equal(elevator.floorTotal, 10)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.state, 'stopped')
  });

  it('should be able to fetch meeka and alex and drop them off on their respective floors', function() {
    elevator.currentFloor = 0;
    elevator.requestFloor(meeka);
    elevator.requestFloor(alex);
    elevator.fetchRider();
    assert.equal(elevator.riders.length, 1)
    elevator.dropOffRider();
    assert.equal(elevator.state, 'stopped')
    elevator.fetchRider();
    assert.equal(elevator.riders.length, 1)
    elevator.dropOffRider();
    assert.equal(elevator.floorTotal, 13)
    assert.equal(elevator.stops, 4)
  });





  xit('should bring a rider to a floor above their current floor', () => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 5)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 2)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 5)
  });

  afterEach(function() {
    elevator.reset();
  });

});

// describe('person a goes up, goes down', function() {
//   const elevator = new Elevator()
//   const alex = new Person("Alex", 2)
//
// it('can have Person A go up to a floor', function() {
//   assert.equal((elevator.requestFloor(alex.name, alex.currentFloor), 2 )
//
// r
// })

// });
