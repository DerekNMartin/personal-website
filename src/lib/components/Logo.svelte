<script>
  import logo from '$lib/assets/logo.png';
</script>

<img src={logo} alt="Derek Martin Personal Logo" class="logo h-14 w-14" />

<style>
  .logo {
    animation:
      blur 30ms infinite,
      glitch 50ms infinite;
  }
  @keyframes blur {
    0% {
      filter: blur(1px);
      opacity: 0.8;
    }
    50% {
      filter: blur(1px);
      opacity: 1;
    }
    100% {
      filter: blur(1px);
      opacity: 0.8;
    }
  }
  @keyframes glitch {
    30% {
    }
    40% {
      transform: scale(1, 1);
      transform: skew(0, 0);
    }
    41% {
      transform: scale(1, 1.1);
      transform: skew(40deg, 0);
    }
    42% {
      transform: scale(1, 1.1);
      transform: skew(-25deg, 0);
    }
    43% {
      transform: scale(1, 1);
      transform: skew(0, 0);
    }
    65% {
    }
  }
</style>
