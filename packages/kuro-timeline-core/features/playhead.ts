import type { KuroTimelineClient } from "../client";

export interface PlayheadData {
  playheadPosition: number
  bounds: DOMRect
}

interface PlayheadGetPositionOptions {
  formatAs: "number" | "timestamp"
}

export class TimelinePlayhead {
  public position: number

  constructor(protected tl: KuroTimelineClient) {
    this.position = 0
  }

  /** Triggers an update if the playhead is moved */
  onMove(cb: (data: PlayheadData) => Promise<void>) { }

  /** Triggers if the playhead's state has changed */
  onUpdateState(cb: (data: PlayheadData) => Promise<void>) { }

  /** Get the current playhead position */
  async getPosition(options?: Partial<PlayheadGetPositionOptions>) { }
  async setPosition(timestamp: number | string) { }

  async resetPosition() {
    await this.setPosition(0)
  }
}