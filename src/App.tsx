import * as React from 'react';
import './App.css';
import { Grid, Row } from 'react-flexbox-grid';

import MyCalendar from './component/Calendar';
import EventForm from './component/EventForm';

class App extends React.Component {
  public render() {
    return (
      <Grid className="App">
        
        <Row>
          <EventForm Col={3} />
        </Row>
        <MyCalendar />
      </Grid>
    );
  }
}

export default App;
