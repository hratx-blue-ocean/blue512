import React from 'react';
import axios from 'axios';
import PreferencesContainer from './PreferencesContainer';
import { Grid, Container } from '@material-ui/core/';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      categories: [],
      userPreferences: '',
      exampleToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZjQwNjBlNThkNzVmZDNmNzBiZWZmODhjNzk0YTc3NTMyN2FhMzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTMxNDYzMDExNDEzLTBidmY1MG5qdjJiM2pwZXNlajJwc2lnNjBncGViMDc5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTMxNDYzMDExNDEzLTBidmY1MG5qdjJiM2pwZXNlajJwc2lnNjBncGViMDc5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MjE2NjYyMjM5Nzc2OTgwNDI2IiwiZW1haWwiOiJjaHJpc2ZhdXJpZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIxRjdVOGhRMHJSTnEybGg4WHFhY25RIiwibmFtZSI6IkNocmlzIEZhdXJpZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy14U25CUkdLY3VoQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkcFJGcm92ck5iNHlrU1lwNDFENHJQNzFsaHRRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJDaHJpcyIsImZhbWlseV9uYW1lIjoiRmF1cmllcyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTY1NzM2MjU1LCJleHAiOjE1NjU3Mzk4NTUsImp0aSI6IjAwYjMzYTIxOWY5MWRmMzBkMmQ4Njk3NTk1NTJiYzUyOTkyOGQyYTkifQ.l2bW46xaPmxc7GDUGpbwhfQMr-pNBs6C8t3mX_0UmZdNLlG9KvdDlCg8_Lb2YeLw_Q_zS5dMXYWjcxKcd4uUy1k9z1n4QRix8FexxYXqKmqT9fxpgcetLPCN-6Cujo1SiLZB-uJtAMRHap6yo1ub9ovV7jJThIzYSXjXjOPl8v7unSwC2nlHrwF-e5pnKlXcOjNHzcUGQqQMPEl2IXAlMGicit6yIw7O5Xv31mvMPepASOk53HMuA_2SKwW0E-Y-HjXEYF1BAOuvgsMK5KYNaDAupF9jssfRkbY_DO4r_MU8O5WjNSXz_rEmtiSYaq4JxTUs94cwmrtlpdbPMUNiTA'
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/categories?token=${this.state.exampleToken}`
      )
      .then(results => results.data)
      .then(({ categories, userPreferences }) =>
        this.setState({ categories, userPreferences })
      );
  }

  postNewPreference(cat, catID, token) {}
  render() {
    return (
      <>
        <Container maxWidth="lg">
          <Grid container>
            <PreferencesContainer
              categories={this.state.categories}
              userPreferences={this.state.userPreferences}
            />
          </Grid>
        </Container>
      </>
    );
  }
}

SettingsView.propTypes = {};
