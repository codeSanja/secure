import React, { Component } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';

class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            feeds: [],
        };
    }

    componentWillMount() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56TXpSVUl5TWtKRk0wUXhORGsxUTBKRk5EVTFSREUzTlRBMk9EaEVRelV6TTBJeE9FTkNSUSJ9.eyJpc3MiOiJodHRwczovL2NvZGVzYW5qYTAuZXUuYXV0aDAuY29tLyIsInN1YiI6IkhxYWdqa3JLQWI1cDZlb3lReTNJMEhaUTZQWWdsckpBQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21hbm55LWxpbmtlZGluIiwiaWF0IjoxNTM5Njk2Njg1LCJleHAiOjE1Mzk3ODMwODUsImF6cCI6IkhxYWdqa3JLQWI1cDZlb3lReTNJMEhaUTZQWWdsckpBIiwic2NvcGUiOiJyZWFkOmNvdXJzZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.bCzotMDZ5t5CTyCOXywVAkNqRbdPKj14dpEPSLdJSppFGmDKX6MvRc9zQ7javq661qjg4FOIpsNJcqWZdxLw-S0VJA0RLYoHDaZBH1JKO1FGMkN1AqvmLWYUqKkxjQXIs039CGgXVmzrszgNP42r3FNR9ya88HvpBZzSMgR5_A4l4KWvsIk5VBiq1WHTyvBBYpoWSU-Uo40K--8UTBLLi7y349vC41oCw_ByezuoqLHsVKAkRMNz1XHgvBOrnx6QLgCN5aULKKiEZMO1EkSUehF99Y5vGGylKWbUe1FOFT_nRujA770ANGb2ZMAnGFP10dbAf6iS-ROscM_rXUD9Qg' };
        const url = 'http://localhost:4000/courses';

        return axios.get(url, {headers})
            .then(response => {
                this.setState({feeds: response.data})
            }).
            catch(error => console.error(error));
    }

    login() {
        return this.props.auth.login();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    !isAuthenticated() && (
                        <h4>You are not logged in. Please {''}
                            <a style={{ 'cursor': 'pointer' }} onClick={this.login.bind(this)} href="">Log in</a>
                            {' '} to continue.
                        </h4>
                    )
                }

                {
                    isAuthenticated() && (
                        this.state.feeds.map((item) =>
                            <FeedItem key={item.id} feed={item} />
                        )
                    )
                }
            </div>
        );
    }
}

export default Feed;

