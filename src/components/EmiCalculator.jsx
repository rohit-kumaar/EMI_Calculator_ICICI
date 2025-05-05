 import React, { useState } from "react";

function EmiCalculator() {
  const homeLoanAmtMin = 0;
  const homeLoanAmtMax = 2_00_00_000;
  const minYears = 10;
  const maxYears = 30;
  const minMonths = 120;
  const maxMonths = 360;
  const interestRateMin = 1;
  const interestRateMax = 20;

  const [homeLoanAmt, setHomeLoanAmt] = useState(homeLoanAmtMin);
  const [years, setYears] = useState(minYears);
  const [months, setMonths] = useState(minMonths);
  const [loanTenureOption, setLoanTenureOptions] = useState(true);
  const [interestRatePer, setInterestRatePer] = useState(interestRateMin);

  const handleChangeHomeLoanAmt = (e) => {
    setHomeLoanAmt(Number(e.target.value));
  };

  const handleChangeYears = (e) => {
    setYears(Number(e.target.value));
  };

  const handleChangeMonths = (e) => {
    setMonths(Number(e.target.value));
  };

  const handleChecked = (e) => {
    setLoanTenureOptions(e.target.id === "years");
  };

  const handleInterestRate = (e) => {
    setInterestRatePer(Number(Number(e.target.value)));
  };

  const P = homeLoanAmt;
  const N = loanTenureOption ? years * 12 : months; // Total number of months
  const monthlyRate = interestRatePer / 12 / 100; // Monthly interest rate

  // EMI formula
  const EMI =
    (P * monthlyRate * Math.pow(1 + monthlyRate, N)) /
    (Math.pow(1 + monthlyRate, N) - 1);

  const totalPayment = EMI * N;
  const totalInterest = totalPayment - P;

  const formattedEMI = EMI ? new Intl.NumberFormat().format(EMI.toFixed(2)) : 0;
  const formattedInterest = totalInterest
    ? Intl.NumberFormat().format(totalInterest.toFixed(2))
    : 0;
  const formattedTotalPayment = totalPayment
    ? Intl.NumberFormat().format(totalPayment.toFixed(2))
    : 0;

  //   const r = interestRatePer / 100;
  //   const n = months;

  //   const EMI = [(P * r * (1 + r)) ^ n] / [((1 + r) ^ n) - 1];
  //   console.log(EMI);

  return (
    <div>
      Home Loan Amount <button>{homeLoanAmt}</button>
      <br />
      <input
        type="range"
        min={homeLoanAmtMin}
        max={homeLoanAmtMax}
        value={homeLoanAmt}
        onChange={handleChangeHomeLoanAmt}
      />
      <h1>-----------------------------------------</h1>
      Loan Tenure
      <button>{loanTenureOption === true ? years : months}</button>
      <span>
        <input
          type="radio"
          id="years"
          name="loanTenure"
          checked={loanTenureOption === true}
          onChange={handleChecked}
        />
        Years
        <input
          type="radio"
          id="months"
          name="loanTenure"
          checked={loanTenureOption === false}
          onChange={handleChecked}
        />
        Months
      </span>
      <br />
      {loanTenureOption ? (
        <div>
          <input
            type="range"
            min={minYears}
            max={maxYears}
            value={years}
            onChange={handleChangeYears}
          />
          Years
        </div>
      ) : (
        <div>
          <input
            type="range"
            min={minMonths}
            max={maxMonths}
            value={months}
            onChange={handleChangeMonths}
          />
          Months
        </div>
      )}
      <h1>-----------------------------------------</h1>
      Interest Rate <button>{interestRatePer} %</button>
      <br />
      <input
        type="range"
        min={interestRateMin}
        max={interestRateMax}
        value={interestRatePer}
        onChange={handleInterestRate}
      />
      <h1>-----------------------------------------</h1>
      <h2>Monthly EMI: ₹ {formattedEMI}</h2>
      <h2>Total Interest Payable: ₹ {formattedInterest}</h2>
      <h2>Total Payment (Principal + Interest): ₹ {formattedTotalPayment}</h2>
    </div>
  );
}

export default EmiCalculator;
