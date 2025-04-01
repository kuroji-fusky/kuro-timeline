<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();
</script>

<div
  data-kuro-timeline-container=""
  style="--kuro-tl-width: 300px;"
  class="flex rounded-md border-2 border-black overflow-y-scroll"
>
  <div id="track-details-layer" class="shrink-0"></div>
  <div id="track-items-layer" class="w-full">
    <!-- contents -->
    {@render children()}
  </div>
</div>
