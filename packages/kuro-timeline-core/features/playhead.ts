import { KuroTimelineClient } from "../client";

export interface PlayheadData {
}

export class TimelinePlayhead {
  public position: number

  constructor(protected tl: KuroTimelineClient) {
    this.position = 0
  }

  async getPosition() { }
  async setPosition(timestamp: number | string) { }

  async resetPosition() {
    await this.setPosition(0)
  }
}