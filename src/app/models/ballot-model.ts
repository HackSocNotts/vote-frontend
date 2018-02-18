import { BallotType } from './ballot-type.enum';
import { BallotOption } from './ballot-option';

/**
 * BallotInterface is used for each ballot a user may be presented with.
 */
export interface BallotModel {
  /**
   * Id of ballot
   * @var string
   */
  id: string;

  /**
   * Name of the ballot
   * @var string
   */
  name: string;

  /**
   * Description of the ballot item
   * @var string
   */
  description: string;

  /**
   * Type of ballot being used. See BallotType enum for details of types
   * @var BallotType
   */
  type: BallotType | string;

  /**
   * The options for the ballot
   * @var BallotOption[] Array of BallotOption interfaces
   * @var null used when the type is Basic
   */
  options: BallotOption[] | null | any;
}
