import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
import { Grow } from '@material-ui/core/';
import { Typography, Grid, Container } from '@material-ui/core/';

const tomorrowPlusPlus = moment()
  .add(2, 'days')
  .format('dddd');

export default function MainView({
  name,
  loaded,
  events,
  eventsToday,
  eventsTomorrow,
  eventsTomorrowPlusPlus,
  handleCardActionClick
}) {
  return (
    <>
      {loaded ? (
        <div>
          <Container maxWidth="lg" align="center">
              { name 
                ? <>
                    <Grow in={true} timeout={500}>
                      <Typography
                        variant="h3"
                        color="textSecondary"
                        style={{ marginTop: 100 }}
                      >
                      {`Hello, ${name.first_name}`}
                      </Typography>
                    </Grow>
                    <Grow in={true} timeout={800}>
                      <Typography
                        variant="h3"
                        color="textSecondary"
                        style={{ marginTop: 20, marginBottom: 10 }}
                      >
                        Here are your Top Picks
                      </Typography>
                    </Grow>
                  </>
                : <Grow in={true} timeout={400}>
                    <Typography
                      variant="h3"
                      color="textSecondary"
                      style={{ marginTop: 125, marginBottom: 50 }}
                    >
                      Here are your Top Picks
                    </Typography>
                  </Grow>
              }
            
            <Grid container>
              <CardContainer
                event={eventsToday.length ? eventsToday[0] : ''}
                day={'Today'}
                animationTime={400}
                handleCardActionClick={handleCardActionClick}
              />
              <CardContainer
                event={eventsTomorrow.length ? eventsTomorrow[0] : ''}
                day={'Tomorrow'}
                animationTime={600}
                handleCardActionClick={handleCardActionClick}
              />
              <CardContainer
                event={
                  eventsTomorrowPlusPlus.length ? eventsTomorrowPlusPlus[0] : ''
                }
                day={tomorrowPlusPlus}
                animationTime={800}
                handleCardActionClick={handleCardActionClick}
              />
            </Grid>
          </Container>
        </div>
      ) : (
        <div
          style={{
            paddingTop: '20vh',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img src={spinner} alt="loading events..." />
        </div>
      )}
    </>
  );
}
