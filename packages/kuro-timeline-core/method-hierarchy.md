# Timeline method hierarchy and Lifecycle

## Call priority

- [Init](#initialization)
  - `init()`
  - `registerPlugins()`
- [Mounted](#mounted)
  - `onReady()` or `on("ready", () => { ... })`
    - `tl.group(async () => { ... })`
    - `on(<event>, <callback>)` or `emit(<event>, <callback>)`
- [Disposing](#disposing)
  - `inert()`
  - `dispose()`

### Initialization

- `init()`: This gets called before any of the timeline events and the workers get fired
- `registerPlugins`: This sets up any built-in and custom plugins defined

Once the worker and event listeners are ready, it calls the `onReady()` event, and internally dispatches events from `init()`.

### Mounted

This is where the client and the web worker are mounted and all its event listeners ready. With `on(<event>)` or `onX()` to listen to timeline events or `emit()` to trigger timeline events and they take high priority

The `group()` method takes an asyncronous callback function that contains a set of `on()` or `emit()` events. Likewise, they can be disposed at anytime.

```ts
const tl = new KuroTimelineClient("#tl")

const rippleDelete = tl.group(async () => {
  // do things
})

// Perform the action
rippleDelete.emit()

// Do cleanup
rippleDelete.dispose()
```

### Disposing

- `inert()`: This clears event listeners but **keeps** the worker connection alive. Useful for modal and dialog prompts for advanced use cases.

- `dispose()`: The clears out **ALL** event listeners and terminated the web worker; this method is called automatically if a page refresh is triggered or called manually.