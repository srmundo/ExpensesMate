export function useState(initialValue) {
  let _val = initialValue; // _val is a local variable created by useState
  function state() {
    // state is an inner function, a closure
    return _val; // state() uses _val, declared by parent function
  }
  function setState(newVal) {
    // same
    _val = newVal; // setting _val is the only way to change _val
  }
  return [state, setState]; // exposing functions for external use
}

// // Example usage:
// const [count, setCount] = useState(0);
// console.log(count()); // 0
// setCount(1);
// console.log(count()); // 1