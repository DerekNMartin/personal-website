<script lang="ts">
  const { width = '320', height = '86', lineWidth = '4', spaceWidth = '10', ...props } = $props();
</script>

<svg
  class={['speaker-panel', props.class]}
  {width}
  {height}
  viewBox={`0 0 ${width} ${height}`}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <pattern id="speakerPattern" width={spaceWidth} height="100%" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width={lineWidth} height="100%" rx="3" ry="3" fill="black" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#speakerPattern)" />
</svg>
