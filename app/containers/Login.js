import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LibraryActions from './../actions/global';
import {LoginCallback} from './Redirect'

console.log("HERE")


function mapStateToProps(state) {
  return {
    installed_games: state.library.installed_games,
    global: state.global
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LibraryActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCallback);
