import React from 'react';
import axios from 'axios';
import PreferencesContainer from './PreferencesContainer';
import UnavailableTime from './UnavailableTime';
import {
  Grid,
  Typography,
  Avatar,
  FormGroup,
  FormControlLabel,
  Switch,
  Container,
  Paper,
  Slide
} from '@material-ui/core/';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      userPreferences: []
    };
    this.postNewPreference = this.postNewPreference.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }
  componentDidMount() {
    this.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userToken !== prevProps.userToken) {
      this.getCategories();
    }
  }

  getCategories() {
    axios
      .get(`/api/categories?token=${this.props.userToken}`)
      .then(results => results.data)
      .then(({ categories, userPreferences }) =>
        this.setState({ categories, userPreferences })
      );
  }

  postNewPreference({ category, id, token, preferred }) {
    axios
      .post(`/api/categories`, {
        category,
        id,
        token,
        preferred
      })
      .then(results =>
        this.setState({ userPreferences: results.data.userPreferences })
      )
      .then(() => this.props.loadEvents(this.props.userToken, []))
      .catch();
  }
  render() {
    return (
      <>
        {/* This is the master level container. It prevents the container from stretching beyond a certain width.
        So on a large screen, the horizontal width will max out at a certain size.  */}
        <Container maxWidth="lg" style={{ marginTop: 80 }}>
          {/* This is a "Grid container" (different than above "Container"). Grid items should be wrapped in this type of container. 
          This section holds the title text and avatar. */}
          <Slide in={true} timeout={400} direction="down">
            <Grid container justify="center">
              <Grid item align="center">
                <Avatar
                  alt="User Avatar"
                  src={this.props.user ? this.props.user.avatar_url : ''}
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    width: 60,
                    height: 60
                  }}
                />
              </Grid>
              <Grid item align="center">
                <Typography
                  variant="h2"
                  style={{ marginTop: 10 }}
                  align="center"
                  color="textSecondary"
                >
                  Hello {this.props.user ? this.props.user.first_name : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 20, marginBottom: 40 }}>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="textSecondary"
                >
                  Help us custom tailor your CityScout experience!
                </Typography>
              </Grid>
            </Grid>
          </Slide>

          {/* This container will hold both the settings toggles, and UnavailableTime
          They will display side by side on large screens, and will stack on small screens */}
          <Grid container>
            {/* UnavailableTime column (Will take up half screen space on "medium+" sizes, and full screen space on anything smaller*/}
            <Grid item xs={12} sm={12} md={6}>
              <Slide in={true} timeout={400} direction="right">
                <Paper
                  style={{
                    padding: 20,
                    margin: 10,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column'
                  }}
                >
                  <UnavailableTime userToken={this.props.userToken} />
                </Paper>
              </Slide>
            </Grid>

            {/* UnavailableTime column (Will take up half screen space on "medium+" sizes, and full screen space on anything smaller*/}
            <Grid item xs={12} sm={12} md={6}>
              <Slide in={true} timeout={400} direction="left">
                <Paper
                  style={{
                    padding: 20,
                    margin: 10,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column'
                  }}
                >
                  <PreferencesContainer
                    categories={this.state.categories.sort((a, b) =>
                      a < b ? -1 : 1
                    )}
                    userPreferences={this.state.userPreferences}
                    handleChange={this.postNewPreference}
                    userToken={this.props.userToken}
                  />
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

SettingsView.propTypes = {};
