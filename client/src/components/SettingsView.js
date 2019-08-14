import React from 'react';
import axios from 'axios';
import PreferencesContainer from './PreferencesContainer';
import { Grid, Typography, Avatar } from '@material-ui/core/';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      userPreferences: ''
    };
    this.postNewPreference = this.postNewPreference.bind(this);
  }
  componentDidMount() {
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
      );
  }
  render() {
    return (
      <>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Avatar
              align="center"
              alt="User Avatar"
              src={this.props.user.avatar_url}
              style={{ marginTop: 10, width: 40, height: 40 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" style={{ marginTop: 10 }} align="center">
              Hello {this.props.user.first_name}!
            </Typography>
          </Grid>
          <Grid item xs={12} justify="center">
            <Typography variant="subtitle1" align="center">
              Help us custom tailor your CityScout experience!
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <PreferencesContainer
              categories={this.state.categories}
              userPreferences={this.state.userPreferences}
              handleChange={this.postNewPreference}
              userToken={this.props.userToken}
              style={{ align: 'center' }}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

SettingsView.propTypes = {};
