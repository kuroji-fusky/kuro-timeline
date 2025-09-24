import { KuroTimelineClient } from "../client";
import { TimelineFeature } from "./base";

export interface TrackData {
}

export interface ClipData {
}

export class TimelineTrack extends TimelineFeature<TrackData> {
  protected _clip_contents: ClipData[]

  constructor(protected tl: KuroTimelineClient) {
    super(tl)

    this._clip_contents = []
  }

  async add(data: TrackData) { }

  async update(kind: string, data: TrackData | TrackData[]) { }

  async remove(id: number) { }
}