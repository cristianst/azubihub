import { Component } from 'react';
import FirebaseApp from '../utils/Firebase';
import { withRouter } from 'react-router';

class LoggedUserLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: null,
            userName: ''
        };
    }
    componentDidMount(){
        FirebaseApp.getCurrentUser().then((result) => {
            this.setState({
                userId: result.uid,
                userName: result.displayName
            });
        }).catch((e) => {
            const { history } = this.props;
            console.log(e);
            history.push({
                pathname: '/404'
            });
        });
    }

    render(){
        if(this.state.userId) {
            const { userId, userName } = this.state;
            return this.props.children({userId, userName});
        }

        return null;
    }
}

export default withRouter(LoggedUserLayout);