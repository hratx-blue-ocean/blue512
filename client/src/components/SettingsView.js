import React from 'react';
import axios from 'axios';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      categories: [],
      response: {},
      exampleToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZjQwNjBlNThkNzVmZDNmNzBiZWZmODhjNzk0YTc3NTMyN2FhMzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTMxNDYzMDExNDEzLTBidmY1MG5qdjJiM2pwZXNlajJwc2lnNjBncGViMDc5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTMxNDYzMDExNDEzLTBidmY1MG5qdjJiM2pwZXNlajJwc2lnNjBncGViMDc5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MjE2NjYyMjM5Nzc2OTgwNDI2IiwiZW1haWwiOiJjaHJpc2ZhdXJpZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJBbE5mb3hjSkNPcy13UXpiZVhPcjF3IiwibmFtZSI6IkNocmlzIEZhdXJpZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy14U25CUkdLY3VoQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkcFJGcm92ck5iNHlrU1lwNDFENHJQNzFsaHRRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJDaHJpcyIsImZhbWlseV9uYW1lIjoiRmF1cmllcyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTY1NzIzNDgyLCJleHAiOjE1NjU3MjcwODIsImp0aSI6ImE4MmFhYThmYTg1OGQ5NDYwMjQ0MjliMDE5ODVlZjc2ZjgzMmY2NWEifQ.mI9GqTEcDeqKgVfOuPann4xgVfpsp1zl4TTSDU-E09aAJqsfsuk364ho9R2-vSNHdCvkeE2Xqtwemd1ESOPMcgR4hNjba4E9YxuqTEvc2dFQ2lioGF0J9kWUPb_Q10EaXErwFw02jJ41BTDqLkSQXTIG2Kma5NsMld3iVLeFMslfaw71uHAMQ7a3zWt-C-4cExYg1V3Ez-jdiIfOlEpjI8r8y5sHMqAQGSfJW1RMPIKMouUV2xKRXJq6wGwUYqPdCRzDr-tDcI6R13pk8qY1dADSNzRCIW6JfonEo3O1Pqnh5K7MxGfHdafpZW-4mRkiKaXB2NuHwWI5ZONrHoBgRw'
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/categories?token=${this.state.exampleToken}`
      )
      .then(results => results.data)
      .then(response =>
        this.setState({ categories: response.categories, response })
      )
      .catch(err => console.log(err));
  }

  postNewPreference() {}
  render() {
    return (
      <>
        Choose some of these categories:
        <ul>
          {this.state.categories
            .filter(cat => cat !== 'undefined')
            .map(cat => (
              <li>{cat}</li>
            ))}
        </ul>
      </>
    );
  }
}

SettingsView.propTypes = {};
