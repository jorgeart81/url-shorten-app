export function getPlatform(): string {
  if ('userAgentData' in navigator) {
    interface UserAgentData {
      platform: string;
    }
    return (navigator.userAgentData as UserAgentData).platform;
  }
  return navigator.platform;
}

export const getClientFingerprint = () => {
  return {
    userAgent: navigator.userAgent,
    platform: getPlatform(),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cores: navigator.hardwareConcurrency,
    resolution: `${window.screen.width}x${window.screen.height}`,
    touch: 'ontouchstart' in window,
  };
};
