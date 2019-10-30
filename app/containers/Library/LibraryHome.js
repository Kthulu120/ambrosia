import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LibraryHomePage from '../../components/Pages/LibraryHomePage.js';
import * as LibraryActions from '../../actions/library';


function mapStateToProps(state) {
  return {
    installed_games: state.library.installed_games,
    installed_launchers: state.settings.installed_launchers.concat({name: 'PC'})
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LibraryActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryHomePage);
