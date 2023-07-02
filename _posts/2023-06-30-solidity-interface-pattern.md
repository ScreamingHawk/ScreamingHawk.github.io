---
layout: post
title: "Solidity Interface Pattern"
excerpt: "An innovative approach to event and error management."
image: "images/steve-johnson-hokONTrHIAQ-unsplash.webp"
imageattribution: "Steve Johnson"
imageattributionlink: https://unsplash.com/@steve_j
tags:
  - code
  - architecture
---

# Solidity Interface Pattern

In the rapidly evolving world of blockchain technology, clarity, and organization in contract coding is vital. As more complex applications emerge, the standard paradigms for developing smart contracts need to be continuously improved. Today, I would like to propose an innovative approach to structuring and organizing events and errors in Solidity contracts - a strategy that aims to foster better readability, easier testing, and ultimately, more robust smart contracts.

## The Current State

Traditionally, Solidity contracts and their corresponding interfaces have included function definitions, event declarations, and, with the introduction of custom errors in Solidity 0.8.4, error declarations. While this all-encompassing approach works functionally, it often leads to cluttered contract interfaces and test contracts that inherit unnecessary elements.

## A New Approach

The proposed model recommends a clear separation of function definitions, events, and errors. Essentially, it suggests creating separate interface for events and errors, with each having a specific purpose. In particular:

    IExample - This interface inherits the lower two interfaces.
    IExampleFunctions - This interface contains function definitions.
    IExampleSignals - This interface contains event and error definitions.

By segregating these aspects, we can provide a more explicit, self-explanatory structure where each contract serves a clear purpose.

As usage for these interfaces are intrinsically linked, all interface definitions are located in the IExample file.

### The Example

The interface file will look like below:

```sol
// IExample.sol

interface IExampleFunctions {
  function exampleFunction() external;
}

interface IExampleSignals {
  error ExampleError();

  event ExampleEvent();
}

interface IExample is IExampleFunctions, IExampleSignals {}
```

The implementation:

```sol
// Example.sol

import {IExample} from "IExample.sol";

contract Example is IExample {
  // Implementation
}
```

The forge test:

```sol
// Example.test.sol

import {IExampleSignals} from "IExample.sol";

contract ExampleTest is IExampleSignals {

  function testExampleError() {
    vm.expectRevert(ExampleError.selector);
    // ...
  }

  function testExampleEvent() {
    vm.expectEmit();
    emit ExampleEvent();
    // ...
  }
}
```

Externally calling contracts:

```sol
// OtherContract.sol

import {IExampleFunctions} from "IExample.sol";

contract OtherContract {

  function other(address ex){
    IExampleFunctions(ex).exampleFunction();
  }

}
```

## The Advantages

The benefits of adopting this strategy are manifold:

**Cleaner Interfaces:** The main interface (IExample in our example) only inherits the events contract, thereby only containing function and event definitions. This makes the interface more concise and easier to read.

**Clear Testing Framework:** Test contracts can inherit from both the events and errors contracts, allowing tests to access relevant events and errors without the clutter of function definitions. This approach offers a cleaner and more focused testing environment.

**Adherence to Single Responsibility Principle:** Each contract has one specific role. This makes the contracts easier to understand, less prone to errors, and increases their maintainability.

**Modularity:** This structure fosters a highly modular design, making the contracts more adaptable for future upgrades or changes.

## Conclusion

In conclusion, the proposed separation of events and errors into distinct contracts serves as an effective way to enhance the readability and testability of Solidity smart contracts. It accommodates for the latest developments in Solidity, while improving the overall structure and organization of contracts. As we continue to build more complex decentralized applications, adopting such innovative approaches will be key to writing clean, robust, and efficient smart contracts.

While this design pattern presents numerous benefits in the current landscape of Solidity development, it's essential to note that it may not be required longer-term as the language evolves. The evolution of Solidity's features, particularly surrounding imports and the potential ability to selectively import contract elements, could result in more streamlined and intuitive ways to manage contract structure. Nevertheless, this approach serves as a robust interim solution, ensuring clarity, readability, and simplicity in our smart contract development process.

*This post was written with the help of AI.*
