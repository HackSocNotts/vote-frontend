/**
 * Enum BallotType specifies the type of ballot
 * @enum Basic indicates a vote where one can vote yes, no, or abstain. Constitutional Amendments are of type Basic.
 * @enum Seat indicates a vote where only one option can win. Presidential seat is are of type Seat.
 * @enum MultiSeat indicates a vote where multiple people can win. A committee that has multiple social secretaries would use MultiSeat.
 */
export enum BallotType {
  BasicBallot,
  NoAbstain,
  SingleSeat,
  MultiSeat,
}
