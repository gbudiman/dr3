import React, { Component } from 'react';
import { range, map } from 'lodash';
import './BarCell.js';

class BarGrid extends React.Component {
  compute(innateQ, totalQ, perGrade=10) {
    if (totalQ < innateQ) throw 'total is less than innate';
    if (innateQ < 0) throw 'innate cannot be negative';

    const innate = this.gradeRemainder(innateQ);
    const boughtQ = totalQ - innateQ;
    const unusedAtLastInnate = perGrade - innate.remainder;
    const boughtFirstGrade = innateQ == 0 ? 0 : boughtQ > unusedAtLastInnate ? unusedAtLastInnate : boughtQ;
    const boughtIndependent = boughtQ - boughtFirstGrade;
    const bought = this.gradeRemainder(boughtIndependent);
    const y = [];

    range(0, innate.grades).map((x) => { y.push(['innate', perGrade])});
    innate.remainder > 0 && y.push(['mixed', innate.remainder, boughtFirstGrade]);
    range(0, bought.grades).map((x) => { y.push(['bought', perGrade])});
    bought.remainder > 0 && y.push(['bought', bought.remainder]);
    
    return y;
  }

  gradeRemainder(quantity, perGrade=10) {
    return {
      grades: parseInt(quantity / perGrade),
      remainder: quantity % perGrade,
    }
  }

  render() {
    return null;
  }
}

export default BarGrid;