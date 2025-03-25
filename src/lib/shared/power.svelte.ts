let isPowerOn = $state(false);
export function usePower() {
  return {
    get isOn() {
      return isPowerOn;
    },
    set isOn(isOn: boolean) {
      isPowerOn = isOn;
    }
  };
}
