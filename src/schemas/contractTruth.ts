export interface ContractTruth {
  proven: {
    verified_source: boolean | null;
    is_proxy: boolean | null;
    runtime_code_hash: string | null;
    controls: {
      mint: boolean | null;
      burn: boolean | null;
      pause: boolean | null;
      blacklist: boolean | null;
    };
    supply_activity: {
      mint_events: number;
      burn_events: number;
    } | null;
  };
}
