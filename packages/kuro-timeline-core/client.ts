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
}

/**
 * The base class for handling timeline UI.
 */
export class KuroTimelineClient {
  #__INIT_INVOKED: boolean;

  public playhead: TimelinePlayhead
  public marker: TimelineMarker
  public track: TimelineTrack

  constructor(protected tlElement: string | Element, private options?: Partial<TimelineOptions>) {
    const isElementString = typeof tlElement === "string"

    if (!(isElementString || tlElement instanceof Element)) {
      new TypeError("Element should either be a CSS selector or a vaild HTML element")
    }
    // Check if the selector is a valid HTML element
    if (isElementString) {
      try {
        // biome-ignore lint/style/noNonNullAssertion: necessary for dealing with DOM elements
        this.tlElement = document.querySelector(tlElement)!
      } catch {
        new TypeError("Element not found or invalid")
      }
    }

    if (tlElement instanceof Element) {
      this.tlElement = tlElement
    }

    this.options = options
    this.#__INIT_INVOKED = false

    // Mount all the core features
    this.playhead = new TimelinePlayhead(this)
    this.marker = new TimelineMarker(this)
    this.track = new TimelineTrack(this)
  }

  registerPlugin(...plugins: TimelinePlugin[]) { }

  init() {
    if (this.#__INIT_INVOKED) {
      throw new ReferenceError("init has been called and cannot be called again")
    }

    this.#__INIT_INVOKED = true
  }

  /** Hook on events */
  on(event: string, cb: () => void) { }

  /** Fire events */
  emit(event: string, cb: () => void) { }

  /** Terminate all event listeners */
  dispose() { }
}
