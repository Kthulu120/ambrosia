import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsHome from '../components/Pages/Settings';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsHome);
