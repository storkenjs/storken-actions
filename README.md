# storken-actions
Add state-specific functions to a state which created by Storken.

# Installation
```bash
# yarn
yarn add storken-actions

# npm
npm install storken-actions
```

# Example
```js
import { create as createStore } from 'storken'
import Actions from 'storken-actions'

const [useStorken] = createStore({
  plugins: {
    actions: Actions
  },
  storkenOptions: {
    tableData: {
      actions: {
        getUsers: (stork, userId) => {
          return fetch('https://myservice.com/user/' + userId)       
            .then(res => res.json())
        },

        getTransactions: (stork, userId) => {
          return fetch('https://myservice.com/transaction/' + userId)       
            .then(res => res.json())
        }
      }
    }
  }
})
```

Action functions behave just like getter functions. Its first parameter gives `Storken object` and the rest parameters are may be action-specific optional parameters.

Actions can also specify like this:

```js
import { create as createStore } from 'storken'
import Actions from 'storken-actions'

const [useStorken] = createStore({
  plugins: {
    actions: Actions
  },
  storkenOptions: {
    tableData: {
      actions: (storken) => ({
        getUser: (userId) => {
          return fetch('https://myservice.com/user/' + userId)       
            .then(res => res.json())
        },

        getTransactions: (userId) => {
          return fetch('https://myservice.com/transactions/' + userId)       
            .then(res => res.json())
        }
      })
    }
  }
})
```

In this way, actions configuration of the state took a function that returns the actions. When the actions configuration is function (like this), the function's first parameter is `storken object` and the action functions get their own (action-specific) parameters directly.


## License
Distributed under the [MIT](/LICENSE) License.

## Contribution
You can contribute by fork this repository and making pull request.
