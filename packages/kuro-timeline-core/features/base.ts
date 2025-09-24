import { KuroTimelineClient } from "../client";

export abstract class TimelineFeature<T = unknown> {
  protected _list: (T | never)[]

  constructor(protected tl: KuroTimelineClient) {
    this._list = []
  }

  abstract add(data: T): Promise<void>
  abstract remove(id: number): Promise<void>
}
