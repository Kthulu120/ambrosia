import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LibraryHomePage from '../../components/Pages/LibraryHomePage.js';
import * as LibraryActions from '../../actions/library';


function mapStateToProps(state) {
  return {
    installed_games: state.library.installed_games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LibraryActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryHomePage);
