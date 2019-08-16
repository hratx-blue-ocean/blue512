import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
import FuzzySearch from 'fuzzy-search'


// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';

export default class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            filteredEvents: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.filterEvents = this.filterEvents.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        //move props into filteredEvents
        if (this.props.events.length !== prevProps.events.length) {
            this.setState({ filteredEvents: this.props.events })
        }
    }

    handleChange(e) {
        this.setState({ input: e.target.value })
        filterEvents()
    }

    filterEvents() {
        let fuzzy = new FuzzySearch(this.state.filteredEvents, [], {
            caseSensitive: false,
            sort: true
        })
        let result = fuzzy.search(this.state.input);
        this.setState({ filteredEvents: result });
    }

    render() {

        return (

            <>
                {/* {this.state.filterEvents.map((event) => {
                    return (<>{event.name}</>)
                })} */}

                <p>oi</p>
            </>
        )
    }

}
// export default function SearchView({ events }) {
//   // const classes = useStyles();
//   console.log(events)

//   let Fuzzy = new FuzzySearch(event.name)

//   return (
//     <>
//         {events.map((event) => {
//             return (<>{event.name}</>)
//         })}
//     </>
//   );
// }
