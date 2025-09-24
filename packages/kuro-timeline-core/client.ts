import { TimelineMarker, TimelinePlayhead, TimelineTrack } from "./features";

/**
 * The base class for handling timeline UI.
 */
export class KuroTimelineClient {
  #__INIT_INVOKED: boolean;

  public playhead: TimelinePlayhead
  public marker: TimelineMarker
  public track: TimelineTrack

  constructor(protected tlElement: string | Element, private options?: Record<string, any>) {
    const isElementString = typeof tlElement === "string"

    if (!(isElementString || tlElement instanceof Element)) {
      new TypeError("Element should either be a CSS selector or a vaild HTML element")
    }
    // Check if the selector is a valid HTML element
    if (isElementString) {
      try {
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

  registerPlugin() { }

  init() {
    if (this.#__INIT_INVOKED) {
      throw new ReferenceError("init has been called and cannot be called again")
    }

    this.#__INIT_INVOKED = true
  }

  on(event: string, cb: () => void) {}
  emit(event: string, cb: () => void) { }

  dispose() {}
}
