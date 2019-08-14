import React from 'react';
import axios from 'axios';
import PreferencesContainer from './PreferencesContainer';
import { Grid, Container } from '@material-ui/core/';

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
        <Container maxWidth="lg">
          <Grid container>
            <PreferencesContainer
              categories={this.state.categories}
              userPreferences={this.state.userPreferences}
              handleChange={this.postNewPreference}
              userToken={this.props.userToken}
            />
          </Grid>
        </Container>
      </>
    );
  }
}

SettingsView.propTypes = {};
