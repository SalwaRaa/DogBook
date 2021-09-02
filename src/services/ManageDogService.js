import dogStore from 'store2'

// dogObject =>
//   - id      : number
//   - name    : string
//   - nick    : string
//   - age     : number
//   - present : boolean
//   - bio     : string
//   - friends : [{id, name}]

// CREATE
export function createDog (dogObject) {
  dogObject.id = generateId();
  dogStore(dogObject.id, dogObject);
}

export function foo() {
  return 'test';
}

// READ
export function getDogs () {
  return dogStore.getAll();
}

export function getDogById (dogId) {
  return dogStore.get(dogId);
}

// UPDATE
export function updateDogById (dogId, dogObject) {
  return dogStore.set(dogId, dogObject);
}

// DELETE
export function deleteDogById (dogId) {
  return dogStore.remove(dogId);
}

export function removeFriendsById (removeFromDogs, currentDogId) {
  removeFromDogs.forEach(d => {
    let dog = getDogById(d.id);
    let updateFriendsList = dog.friends.filter(d => d.id !== currentDogId);
    dog.friends = updateFriendsList;
    updateDogById(dog.id, dog);
  })
}

// HELPERS
function generateId() {
  // random number between 0-999999
  return Math.floor(Math.random() * 1000000);
}

