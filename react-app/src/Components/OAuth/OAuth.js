import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';
import { store } from '../../index'
import { connect } from "react-redux";
import { saveOAuthData } from '../../Actions/actions';

const mapDispatchToProps = {
    saveOAuthData
}

const mapStateToProps = (state) => ({
    credentials: state.oauth.Credentials
});

export function OAuth (props) {

    const [name, setName] = useState(undefined);
    const [accessToken, setAccessToken] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    const [LoginDetails, setLoginDetails] = useState(undefined);
    

    const responseGoogle = (response) => {
        console.log("inside responseGoogle function ")
        if (response.profileObj === undefined) {
            setName(undefined)
            setAccessToken(undefined)
            setLoggedIn(false )
        } else {
            setName(response.profileObj.name)
            setAccessToken(response.tokenObj.access_token)
            setLoggedIn(true)
        }
        console.log("accessToken: " + accessToken);
        console.log("logged in: " + loggedIn);
        console.log("name: " + name);
        store.dispatch(saveOAuthData(response));
    }
        if (name === undefined) {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText="Sign In"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        scope="https://www.googleapis.com/auth/drive.file"
                        name={name}
                        loggedIn={loggedIn}
                        accessToken={accessToken}
                        onClick={LoginDetails}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText={"Signed In As " + name}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        name={name}
                        loggedIn={loggedIn}
                        accessToken={accessToken}
                        scope="https://www.googleapis.com/auth/drive.file"
                        onClick={LoginDetails}
                    />
                </div>
            )
        }

    }
//export default OAuth
export default connect(mapStateToProps, mapDispatchToProps)(OAuth);