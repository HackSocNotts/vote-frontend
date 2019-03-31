import { Component, OnInit } from '@angular/core';
import { ElectorateService } from '../../services/electorate.service';

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.css']
})
export class GetCodeComponent implements OnInit {

  code: string;
  idnumber: number;

  error: string;
  errorMessage: string;

  electorCode: string;

  constructor(
    private electorate: ElectorateService
  ) { }

  ngOnInit() {
  }

  getCode() {
    this.electorate.getElectorCode(this.code, this.idnumber)
      .toPromise()
      .then(response => {
        if (!!response['error']) {
          this.error = 'Error';
          this.errorMessage = response['error'];
        } else {
          this.electorCode = `${this.code}-${response['code']}`;
        }
      })
      .catch(err => {
        console.error(err);
        this.error = 'Error';
        this.errorMessage = err.error.error;
      });
  }

}
