/**
 * The options for a seat or multi seat ballot
 */
export interface CandidateModel {
  /**
   * ID of the option
   * @var string
   */
  id: string;

  /**
   * The name of the option
   * @var string
   */
  name: string;

  /**
   * A manifesto of the option
   * @var string
   */
  manifesto: string;
}
