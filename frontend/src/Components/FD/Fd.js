import React, { useState } from "react";
import { Grid } from "@material-ui/core";
export default function Fd() {
  const [interest, setinterest] = useState(0.1);
  const [years, setyears] = useState(0);
  const [cycle, setcycle] = useState(1);
  const [result, setresult] = useState([]);
  const [Increment, setIncrement] = useState(0);
  const [initialamount, setinitialamount] = useState(0);
  const [totalCommission, settotalCommission] = useState(0);

  const calculate = () => {
    let resultcpty = [];
    let totalcycles = cycle * (12 * years); //Cycles per mounth
    let i = 1;
    let amount = initialamount;
    let totalComm = 0;
    for (i = 0; i < totalcycles; i++) {
      let benifit = 0;
      if (i % cycle === 0 && i !== 0) {
        amount = parseInt(amount) + parseInt(Increment);
      }
      benifit = parseInt((interest * parseInt(amount)) / 100);
      amount = parseInt(amount) + benifit;
      let newamount = parseInt(amount / 1000);
      newamount = newamount * 1000;
      let comm = amount - newamount;
      totalComm = parseInt(totalComm + parseInt(comm));
      resultcpty.push({
        Amount: newamount,
        commission: comm,
      });
      amount = newamount;
    }
    setresult(resultcpty);
    settotalCommission(totalComm);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        initialamount
        <input
          value={initialamount}
          onChange={(e) => {
            setinitialamount(e.target.value);
          }}
          type="number"
          placeholder={"initialamount"}
        />
      </Grid>
      <Grid item xs={6}>
        {"interest "}
        <input
          value={interest}
          onChange={(e) => {
            setinterest(e.target.value);
          }}
          type="number"
          placeholder={"interest"}
        />
      </Grid>
      <Grid item xs={6}>
        cycle
        <input
          value={cycle}
          onChange={(e) => {
            setcycle(e.target.value);
          }}
          type="number"
          placeholder={"cycle"}
        />
      </Grid>
      <Grid item xs={6}>
        years
        <input
          value={years}
          onChange={(e) => {
            setyears(e.target.value);
          }}
          type="number"
          placeholder={"years"}
        />
      </Grid>
      <Grid item xs={12}>
        {" "}
        Increment
        <input
          value={Increment}
          onChange={(e) => {
            setIncrement(e.target.value);
          }}
          type="number"
          placeholder={"Increment"}
        />
        <Grid>
          <button
            onClick={() => {
              calculate();
            }}
          >
            Submit
          </button>
        </Grid>
      </Grid>

      {result.map((singleresult) => (
        <>
          <Grid item xs={6}>
            {" "}
            {singleresult.Amount}
          </Grid>
          <Grid item xs={6}>
            {" "}
            {singleresult.commission}
          </Grid>
        </>
      ))}
      <Grid item xs={12}>
        {totalCommission}
      </Grid>
    </Grid>
  );
}
