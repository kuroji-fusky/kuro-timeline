import { TimelineFeature } from "./base";

export interface MarkerData {
}

export class TimelineMarker extends TimelineFeature<MarkerData> {
  async add(...data: MarkerData[]) { }

  async getMarkerByName(name: string) { }
  
  /**
   * To get all markers, use `getMarkers()` instead.
   * 
   * @param id the UUID of a given marker
   */
  async getMarkerById(id: string) { }

  async getMarkers() { }

  async remove(id: number) { }
  async removeAll() { }
}