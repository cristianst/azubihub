import { Component } from 'react';
import FirebaseApp from '../utils/Firebase';
import { withRouter } from 'react-router';

class LoggedUserLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: null,
        };
    }
    componentDidMount(){
        FirebaseApp.getCurrentUser().then((result) => {
            this.setState({
                userId: result.uid
            });
        }).catch((e) => {
            const { history } = this.props;
            history.push({
                pathname: '/404'
            });
        });
    }

    render(){
        if(this.state.userId) return this.props.children;
        return null;
    }
}

export default withRouter(LoggedUserLayout);