import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessagePage from './index';
import * as LibraryActions from '../../actions/library';
import { stat } from 'fs-extra-p';


function mapStateToProps(state) {
  return {
    installed_games: state.library.installed_games,
    userID: state.global.graphQLId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LibraryActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);
