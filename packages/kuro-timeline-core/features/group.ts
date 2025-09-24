import { KuroTimelineClient } from "../client"

export class TimelineGroup {
  #called_functions: (Record<string, Function> | never)[]

  constructor(protected tl: KuroTimelineClient, private internal_cb: () => void) {
    this.#called_functions = []
  }

  async emit() {
    this.internal_cb()
  }

  async dispose() { }
}