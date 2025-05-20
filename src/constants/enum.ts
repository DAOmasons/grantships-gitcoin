export enum ContestStatus {
  None,
  Populating,
  Voting,
  Continuous,
  Finalized,
  Executed,
}

export enum Role {
  None,
  System,
  Operator,
  Judge,
  Admin,
}

export enum TimerType {
  Auto, // timer starts automatically on init
  Lazy, // timer starts from an external contract call, usually finalize choices in choice module
  Preset, // preset time start at advance point in time (used for continuous and when choices are also timed)
}
