import { TimelineMarker, TimelinePlayhead, TimelineTrack } from "./features";
import type { TimelinePlugin } from "./plugin";

interface TimelineOptions {
  /**
   * Specifies what mode the timeline will operate in, set to `basic` by default.
   * 
   * - `basic`: Only provides the basic functions and can extend built-in plugins, but not custom ones
   * - `advanced`: Includes all the functions and can extend to *any* plugin
   */
  mode: "basic" | "advanced"
  /**
   * Provide a url connection to a database
   */
  remoteUrl: string
  /**
   * Enable debug mode
   */
  debug: boolean
}

/**
 * The base class for handling timeline UI.
 */
export class KuroTimelineClient {
  #__INIT_INVOKED: boolean;
  #__INIT_ABORT: AbortController;

  public playhead: TimelinePlayhead
  public marker: TimelineMarker
  public track: TimelineTrack

  constructor(protected tlElement: string | Element, private options?: Partial<TimelineOptions>) {
    // Init DOM stuff
    const isElementString = typeof tlElement === "string"

    if (!(isElementString || tlElement instanceof Element)) {
      throw new TypeError("Element should either be a CSS selector or a vaild HTML element")
    }
    // Check if the selector is a valid HTML element
    if (isElementString) {
      try {
        // biome-ignore lint/style/noNonNullAssertion: necessary for dealing with DOM elements
        this.tlElement = document.querySelector(tlElement)!
      } catch {
        throw new TypeError("Element not found or invalid")
      }
    }

    if (tlElement instanceof Element) {
      this.tlElement = tlElement
    }

    this.options = options
    this.#__INIT_INVOKED = false
    this.#__INIT_ABORT = new AbortController()

    // Mount all the core features
    this.playhead = new TimelinePlayhead(this)
    this.marker = new TimelineMarker(this)
    this.track = new TimelineTrack(this)
  }

  registerPlugin(...plugins: TimelinePlugin[]) { }

  /**
   * Some code to be run before timeline logic and the worker has been mounted
   * 
   * Note that this method can't be used inside `group()`, nor it can be called more than once.
   */
  init(cb: () => void) {
    if (this.#__INIT_INVOKED) {
      throw new ReferenceError("init has been called and cannot be called again")
    }

    window.addEventListener("DOMContentLoaded", cb, { signal: this.#__INIT_ABORT.signal })

    this.#__INIT_INVOKED = true
    this.#__INIT_ABORT.abort()
  }

  /** Hook on events */
  on(event: string, cb: () => void) { }

  /** Fire events */
  emit(event: string, cb: () => void) { }

  /** 
   * Terminates event listeners but keeps communications with the worker
   * 
   * This shouldn't be called manually, unless if you have `options.autoBlur` disabled.
   */
  hibernate() { }

  /** Terminate all event listeners and disconnects communication with the worker
   * 
   * This is a last-ditch option, as you'll need to re-initialize or requiring
   * the end user to refresh the browser
   */
  dispose() { }
}
