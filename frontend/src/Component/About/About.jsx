import React from "react";
import aboutImage from "../../images/aboutmachine.jpg";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const About = () => {

 

  return (
    <div style={{ background: 'white' }}>
      <Container>
        <Grid mt={5} container spacing={2} mb={5}>
          <Grid item xs={12} md={6}>
            <img style={{ borderRadius: '50%' }} src={aboutImage} alt="" />
          </Grid>
          <Grid item xs={12} md={6} style={{ alignContent: 'center', textAlign: 'center' }}>
            <Typography
              style={{
                textAlign: "center",
                color: "rgb(18 80 141)",
                fontFamily: "poppins",
                fontWeight: "600",
                fontSize: '30px'
              }}
              mb={2}>
              <u>About</u>
            </Typography>
            <Typography style={{ textAlign: "center", color: 'gray', letterSpacing: '1px' }} variant="body1">
              Under the guidance of Sh. Suresh Chandra Gupta, the company was
              started in 1975 with a small set up to start manufacturing the
              American type Turning and Parting Tool Holders to supply to the
              people exporting it in their name from India. Today after around
              four decades years of Manufacturing experience & with his 2nd
              generation in business, WE are one of the leading
              Manufacturer-Exporter from India of large variety of Machine Tools
              Accessories for Hobby Machinists, Model Makers, Wood Workers,
              Carpenters & Industrial applications supplying to the various
              renowned retailers of Europe, USA, Asia & Other parts of the Globe.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default About;
