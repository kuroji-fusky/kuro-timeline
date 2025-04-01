import { writable } from "svelte/store";

interface TLTracks {
  id: string
  title: string
}

export const timelineTracks = writable<TLTracks[]>([])