import React ,{ Component } from "react" ;
import Link from "react-router-dom" ;
import { Layout , Icon } from "antd" ;
import logo from '../logo.svg';

const { Header } = Layout;
export default class HeaderWrap extends Component {
    render(){
        return (
            <Header style={{ background: '#000', padding: 0 ,position: 'fixed', zIndex: 999, width: '100%'}}>
                <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsedFlag ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.onFun}
                        style={{cursor: 'pointer'}}
                    />
                </span>
                <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                    <img src={logo} className="App-logo" alt="logo" />
                </span>
            </Header>
        )
    }
}
