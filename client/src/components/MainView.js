import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
import { Fade } from '@material-ui/core/';
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
  handleCardActionClick,
  isSignedIn,
  path,
  handlePageClick,
  handleMicroCardClick
}) {
  return (
    <>
      {loaded ? (
        <div>
          <Container maxWidth="lg" align="center">
            {name
              ? <>
                <Fade in={true} timeout={500}>
                  <Typography variant="h2" style={{ marginTop: 10 }} align="center" color="textSecondary" style={{ marginTop: 100, marginBottom: 0 }}>
                    {`Hello, ${name.first_name}`}
                  </Typography>
                </Fade>
                <Fade in={true} timeout={800}>
                  <Typography
                    variant="h2"
                    align="center"
                    color="textSecondary"
                    style={{ marginTop: 20, marginBottom: 10 }}
                  >
                    Here are your Top Picks
                      </Typography>
                </Fade>
              </>
              : <>
                <Fade in={true} timeout={400}>
                  <Typography
                    variant="h2"
                    style={{ marginTop: 10 }}
                    align="center"
                    color="textSecondary"
                    style={{ marginTop: 100, marginBottom: 0 }}
                  >
                    Here are our suggestions
                      </Typography>
                </Fade>
                <Fade in={true} timeout={800}>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    style={{ marginTop: 20, marginBottom: 10 }}
                  >
                    Log in for a custom tailored experience
                      </Typography>
                </Fade>
              </>
            }

            <Grid container>
              <CardContainer
                event={eventsToday.length ? eventsToday[0] : ''}
                day={'Today'}
                animationTime={400}
                handleCardActionClick={handleCardActionClick}
                isSignedIn={isSignedIn}
                path={path}
                handlePageClick={handlePageClick}
                handleMicroCardClick={handleMicroCardClick}
              />
              <CardContainer
                event={eventsTomorrow.length ? eventsTomorrow[0] : ''}
                day={'Tomorrow'}
                animationTime={600}
                handleCardActionClick={handleCardActionClick}
                isSignedIn={isSignedIn}
                path={path}
                handlePageClick={handlePageClick}
                handleMicroCardClick={handleMicroCardClick}
              />
              <CardContainer
                event={eventsTomorrowPlusPlus.length ? eventsTomorrowPlusPlus[0] : ''}
                day={tomorrowPlusPlus}
                animationTime={800}
                handleCardActionClick={handleCardActionClick}
                isSignedIn={isSignedIn}
                path={path}
                handlePageClick={handlePageClick}
                handleMicroCardClick={handleMicroCardClick}
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
