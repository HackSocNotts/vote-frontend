export interface ElectorModel {
  /**
   * UID of electorate code
   */
  id: string;

  /**
   * Whether or not the voters vote is locked
   */
  locked: boolean;

  /**
   * Object container vote data
   */
  votes: any;

  /**
   * Whether or not the code has been assigned
   */
  assigned: boolean;
}
