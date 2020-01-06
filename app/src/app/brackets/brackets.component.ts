import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss']
})
export class BracketsComponent implements OnInit {
  public result: string;
  public isValid: boolean;

  public bracketsForm = new FormGroup({
    data: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.validateBrackets(this.bracketsForm.get('data').value.trim().split(''))) {
      this.isValid = true;
      this.result = 'Your input is valid';
    } else {
      this.isValid = false;
      this.result = 'Your input is invalid';
    }
  }

  public validateBrackets(source: Array<string>): boolean {
    const bracketsCheck: Array<string> = [];
    let current: string;

    for (const item of source) {
      if (item === '(' || item === '[' || item === '{') {
        bracketsCheck.push(item);
        continue;
      }

      if (bracketsCheck.length === 0)
        return false;

      switch (item) {
        case ')':

          current = bracketsCheck[bracketsCheck.length - 1];
          bracketsCheck.pop();
          if (current === '{' || current === '[')
            return false;
          break;

        case '}':

          current = bracketsCheck[bracketsCheck.length - 1];
          bracketsCheck.pop();
          if (current === '(' || current === '[')
            return false;
          break;

        case ']':

          current = bracketsCheck[bracketsCheck.length - 1];
          bracketsCheck.pop();
          if (current === '(' || current === '{')
            return false;
          break;
      }
    }

    return bracketsCheck.length === 0;
  }

}
