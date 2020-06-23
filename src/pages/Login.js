import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const { Content, Header, Footer } = Layout;

export class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             google:{},
             facebook:{}
        }
    }
    
    componentClicked = () => console.log("clicked");

    responseFacebook = (response) => {
        this.setState({
            facebook:{
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url 
            }
        })
        console.log(response);
        console.log("ESTO ES TU OBJETO FACEBOOK: "+this.state.facebook.name);
    }
    
    responseGoogle = (response) => {
        this.setState({
            google:{
                name: response.Rt.Bd,
                email: response.Rt.Bu,
                picture: response.Rt.dL 
            }
        })
        this.props.setUserGoogle(this.state.google);
        this.props.setIsLogin();
    }

    render() {
        return (
            <Layout>               
            <Header className='header'></Header>
                <Content className="content-login">
                    <p>E-Commerce</p>                 
                    <Card style={{ width: '50%' }}>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}>
                                <Input.Password />
                            </Form.Item>
                                <GoogleLogin
                                    clientId="354596986729-j2kjnq4ttrjh3fsffqi9lbar7ftt6r6o.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}/>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Link to= {{ pathname: '/' }}>
                                    <Button type="primary" htmlType="submit">
                                        Iniciar
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>               
                    </Card>
                </Content>
            <Footer className="footer"></Footer>
            </Layout>
        );
    }
}

export default Login