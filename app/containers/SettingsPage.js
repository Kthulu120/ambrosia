import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsHome from '../components/Pages/Settings';
import * as SettingActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    settings: state.settings,
    installed_launchers: state.settings.installed_launchers,
    game_libraries: state.settings.game_libraries
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsHome);
