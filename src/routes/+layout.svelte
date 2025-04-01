<script lang="ts">
  import "../app.css";

  const { children } = $props();
</script>

<div style="display: contents;">
  <main>
    {@render children()}
  </main>
</div>
