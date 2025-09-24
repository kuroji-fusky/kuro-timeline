<script lang="ts">
  import { type Snippet, onMount } from "svelte";
  import { timelineTracks } from "./TimelineStore.js";

  interface Props {
    children: Snippet;
  }

  const randomTrackHash = crypto.randomUUID();

  $effect.pre(() => {
    timelineTracks.update((prev) => {
      return [...prev, { id: randomTrackHash, title: "none" }];
    });
  });

  const { children }: Props = $props();
</script>

<div id="track-item" data-tl-debug-track-hash={randomTrackHash} class="w-full">
  {@render children()}
</div>
