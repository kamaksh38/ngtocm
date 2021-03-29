import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

const FACT = 2.54;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Inch To Cm Converter';
  public inch: string;
  public cm: number;
  public fractionUsed: boolean;
  public simplified: boolean;
  public base: number;

  public constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
    this.base = 16;
    console.log('===== toDecimal() =====');
    console.log('1  ->  ' + this.toDecimal('1'));
    console.log('1.2  ->  ' + this.toDecimal('1.2'));
    console.log('1/2  ->  ' + this.toDecimal('1/2'));
    console.log('1/16  ->  ' + this.toDecimal('1/16'));
    console.log('3/2  ->  ' + this.toDecimal('3/2'));
    console.log('1 2/3  ->  ' + this.toDecimal('1 2/3'));
    console.log('===== toFraction() =====');
    console.log('1  ->  ' + this.toFraction(1));
    console.log('0.1  ->  ' + this.toFraction(0.1));
    console.log('1.2  ->  ' + this.toFraction(1.2));
    console.log('1.5  ->  ' + this.toFraction(1.5));
    console.log('1.96  ->  ' + this.toFraction(1.96));
    console.log('1.97  ->  ' + this.toFraction(1.97));
  }


  convertToInch() {
    this.inch = (this.cm / FACT).toFixed(4);
    if (this.fractionUsed) {
      this.inch = this.toFraction((this.cm / FACT).toFixed(4));
    }
  }

  convertToCm() {
    this.cm = (this.toDecimal(this.inch) * FACT);
  }

  toDecimal(fractionString) {
    let decimal = 0;
    let tokens = fractionString.trim().split(/\s+/);
    if (tokens.length == 1) {
      let parts = tokens[0].trim().split('/');
      if (parts.length == 1) {
        decimal = parseFloat(parts[0]);
      } else if (parts.length == 2) {
        decimal = parseInt(parts[0]) / parseInt(parts[1]);
      }
    } else if (tokens.length == 2) {
      decimal = parseInt(tokens[0]);
      let parts = tokens[1].split('/', 2);
      if (parts.length == 2) {
        decimal = ((parseInt(parts[0]) / parseInt(parts[1])) + decimal);
      }
    }
    return decimal;
  }

  toggleFraction() {
    this.convertToInch();
  }

  toFraction(number) {
    if (isNaN(number)) {
      return 'NaN';
    }
    let integer = parseInt(number);
    let numerator = Math.round((number - integer) * this.base);
    if (numerator == this.base) {
      integer = integer + 1;
      numerator = 0;
    }
    if (numerator == 0) {
      return integer.toString();
    } else {
      if (integer == 0) {
        if (this.simplified) {
          return this.reduce(numerator, this.base).toString().replace(',', '/');
        }
        return numerator + '/' + this.base;
      } else {
        if (this.simplified) {
          return integer + ' ' + this.reduce(numerator, this.base).toString().replace(',', '/');
        }
        return integer + ' ' + numerator + '/' + this.base;
      }
    }
  }

  simplifiedFraction() {
    this.convertToInch();
  }

  reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    // @ts-ignore
    return [numerator / gcd, denominator / gcd];
  }
}
