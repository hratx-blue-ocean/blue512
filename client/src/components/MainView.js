import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
import { Grow } from '@material-ui/core/';

// import fetch from 'node-fetch';

// import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Container } from '@material-ui/core/';

// const useStyles = makeStyles(theme => ({
// }));

// const today = moment().format('dddd')
// const tomorrow = moment().add(1, 'days').format('dddd')
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
  // const classes = useStyles();

  return (
    <>
      {loaded ? (
        <div>
          <Container maxWidth="lg" align="center">
            <Grow in={true} timeout={400}>
              <Typography
                variant="h3"
                color="textSecondary"
                style={{ marginTop: 125, marginBottom: 50 }}
              >
                {name
                  ? `Hello ${name.first_name}, here are your top picks`
                  : `Top Picks For You`}
              </Typography>
            </Grow>
            <Grid container>
              <CardContainer
                event={events[0]}
                day={'Today'}
                animationTime={400}
                handleCardActionClick={handleCardActionClick}
              />
              <CardContainer
                event={events[1]}
                day={'Tomorrow'}
                animationTime={600}
                handleCardActionClick={handleCardActionClick}
              />
              <CardContainer
                event={events[2]}
                day={tomorrowPlusPlus}
                animationTime={800}
                handleCardActionClick={handleCardActionClick}
              />
            </Grid>
            <Button
              variant="outlined"
              className={classes.margin}
              onClick={handleClick}
            >
              Open success snackbar
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <SnackbarContent
                onClose={handleClose}
                variant="success"
                message="This is a success message!"
              />
            </Snackbar>
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

// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CloseIcon from '@material-ui/icons/Close';
// import { amber, green } from '@material-ui/core/colors';
// import IconButton from '@material-ui/core/IconButton';
// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';
// import WarningIcon from '@material-ui/icons/Warning';
// import { makeStyles } from '@material-ui/core/styles';

// const variantIcon = {
//   success: CheckCircleIcon
// };

// const useStyles1 = makeStyles(theme => ({
//   success: {
//     backgroundColor: green[600],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

// function MySnackbarContentWrapper(props) {
//   const classes = useStyles1();
//   const { className, message, onClose, variant, ...other } = props;
//   const Icon = variantIcon[variant];

//   return (
//     <SnackbarContent
//       className={clsx(classes[variant], className)}
//       aria-describedby="client-snackbar"
//       message={
//         <span id="client-snackbar" className={classes.message}>
//           <Icon className={clsx(classes.icon, classes.iconVariant)} />
//           {message}
//         </span>
//       }
//       action={[
//         <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
//           <CloseIcon className={classes.icon} />
//         </IconButton>,
//       ]}
//       {...other}
//     />
//   );
// }

// MySnackbarContentWrapper.propTypes = {
//   className: PropTypes.string,
//   message: PropTypes.string,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
// };

// export default function CustomizedSnackbars() {

//   return (
//     <div>

//     </div>
//   );
// }
