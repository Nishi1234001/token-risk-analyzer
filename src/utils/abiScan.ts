export function scanControls(abi: any[] | null) {
  if (!abi) {
    return {
      mint: null,
      burn: null,
      pause: null,
      blacklist: null
    };
  }

  const names = abi.map((x) => x.name?.toLowerCase());

  return {
    mint: names.some((n) => n?.includes("mint")),
    burn: names.some((n) => n?.includes("burn")),
    pause: names.some((n) => n?.includes("pause")),
    blacklist: names.some((n) => n?.includes("blacklist"))
  };
}
