# Timeline method Hierarchy and Lifecycle

## Call priority

- Init
  - `init()`
  - `registerPlugins()`
- Mounted
  - `onReady()` or `on("ready", () => { ... })`
    - `tl.group(async () => { ... })`
    - `on(<event>, <callback>)` or `emit(<event>, <callback>)`
- Disposing
  - `inert()`
  - `dispose()`

## Initialization

- `init()`: This gets called before any of the timeline events and the workers get fired
- `registerPlugins`: This sets up any built-in and custom plugins defined

Once the worker and event listeners are ready, it calls the `onReady()` event, and internally dispatches events from `init()`.

## Disposing

- `inert()`: This clears event listeners but **keeps** the worker connection alive. Useful for modal and dialog prompts for advanced use cases.

- `dispose()`: The clears out **ALL** event listeners and terminated the web worker; this method is called automatically if a page refresh is triggered or called manually.