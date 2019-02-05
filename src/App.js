import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import NavBar from './common/NavBar';
import CLR from './config/CLR';
import styled from '@emotion/styled';
import LoginScreen from './teams/teams-components/LoginScreen';
import { autoSignIn } from './config/ActionsIndex';
import LoadingIndicator from './common/LoadingIndicator';
import { TEAMS, CUSTOMERS, PRODUCTS, ITEMS, TASKS } from './config/RoutesIndex';
import TeamsScreen from './teams/teams-components/TeamsScreen';
import CustomersScreen from './customers/customers-components/CustomersScreen';
import ProductsScreen from './products/products-components/ProductsScreen';
import ItemsScreen from './items/items-components/ItemsScreen';
import TasksScreen from './tasks/tasks-components/TasksScreen';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.props.autoSignIn(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      )
    }
    if (!this.props.isSignedIn) return <AppContainer><LoginScreen /></AppContainer>;
    return (
      <AppContainer>
        <NavBar />
        <AppContentContainer>
          <Switch>
            <Route path={CUSTOMERS} component={CustomersScreen}/>
            <Route path={PRODUCTS} component={ProductsScreen}/>
            <Route path={ITEMS} component={ItemsScreen}/>
            <Route path={TASKS} component={TasksScreen}/>
            <Route path={TEAMS} component={TeamsScreen}/>
          </Switch>
        </AppContentContainer>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div(() => ({
  display: 'block',  
  width: '100vw', 
  height: '100vh',
}));
const LoadingContainer = styled.div(() => ({
  display: 'flex',  
  width: '100vw', 
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: CLR.WHITE
}));
const AppContentContainer = styled.div(() => ({
  height: 'calc(100vh - 60px)',
  backgroundColor: CLR.WHITE,
  display: 'inline-block',
  width: '100vw'
}));

const mapStateToProps = ({ teams }) => {
  const { 
    isSignedIn,
    signInVisible,
    token,
   } = teams;
  return {
    isSignedIn,
    signInVisible,
    token,
  };
}

export default connect(mapStateToProps, { autoSignIn })(App);
