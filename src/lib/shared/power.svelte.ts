import type { Snapshot } from './$types';

let isPowerOn = $state(false);

export function usePower() {
  const snapshot: Snapshot<boolean> = {
    capture: () => isPowerOn,
    restore: (value: boolean) => (isPowerOn = value)
  };

  return {
    get isOn() {
      return isPowerOn;
    },
    set isOn(isOn: boolean) {
      isPowerOn = isOn;
    },
    snapshot
  };
}
