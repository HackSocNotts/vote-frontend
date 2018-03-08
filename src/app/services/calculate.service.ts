import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CalculateService {

  constructor(
    private http: HttpClient
  ) { }

  proccess_basic_ballot(election: string, ballot: string, ) {
    const parameters = [
      {name: 'ballot', value: ballot},
      {name: 'election', value: election}
    ] as ParameterModel[];
    return this.http.get(this.build_url('BasicBallot', parameters))
      .map(result => {
        return {
          result: result['result'],
          ballot: result['document']
        };
      });
  }

  proccess_av_ballot(election: string, ballot: string, ) {
    const parameters = [
      {name: 'ballot', value: ballot},
      {name: 'election', value: election}
    ] as ParameterModel[];
    return this.http.get(this.build_url('AVBallot', parameters));
  }

  /**
   * Build URL
   * @param {string} func
   * @param {ParameterModel[]} parameters
   * @return {string}
   */
  private build_url (func: string, parameters?: ParameterModel[]) {
    let url = environment.baseUrl + func;

    if (!parameters) {
      return url;
    } else {
      url += '?';
    }

    for (const parameter of parameters) {
      url += parameter.name + '=' + parameter.value + '&';
    }

    return url;
  }

}

interface ParameterModel {
  name: string;
  value; string;
}
