import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function EventNameBox(props) {
  const handleClick = (index) => {
    props.SelectEvent(index);
  };
  const [rdata, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data, props.SelectedEvent]);

  return (
    <Grid container spacing={1} className="eventslider">
      {rdata.map((d, index) => (
        <Grid
          item
          xs={12 / rdata.length}
          sm={12 / rdata.length}
          md={12 / rdata.length}
          key={index + "k"}
        >
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => {
              handleClick(index);
            }}
            variant="contained"
            color="primary"
            className={
              props.SelectedEvent === index
                ? "event-buttons current"
                : "event-buttons "
            }
          >
            {d.Name === "" ? "Event " + (index + 1) : d.Name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
