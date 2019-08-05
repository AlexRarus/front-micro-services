# Micro-services

The Micro-services library exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

Using npm:
```shell
$ npm i --save @truefalse/front-micro-services
```
## Example Usage
Create Module:
```jsx
// in module project
import React, { Component } from 'react';
import { createModule } from '@truefalse/front-micro-services';

class ChildApplication extends Component {
  static propTypes = {
    // pass from createModule
    resize: PropTypes.func,
    sibscribeOnMessage: PropTypes.func,
    sendMessage: PropTypes.func,
    // ...otherProps
  };

  render() {
    return (
      <div>
      	child application
      </div>
    );
  }
}

export default createModule(ChildApplication);
```

Include module in parent

```jsx
// in parent project
import React, { Component } from 'react';
import { ModuleInstance } from '@truefalse/front-micro-services';

class ParentApplication extends Component {
  render() {
    return (
      <div>
        <ModuleInstance
          moduleUrl="http://childmodule.com" // url to module
          name="childmodule"
        >
      </div>
    );
  }
}

export default ParentApplication;
```

