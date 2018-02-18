/**
 * The options for a seat or multi seat ballot
 */
export interface BallotOption {
  /**
   * ID of the option
   * @var number
   */
  id: number;

  /**
   * The name of the option
   * @var string
   */
  name: string;

  /**
   * A description of the option
   * @var string
   */
  description: string;
}
