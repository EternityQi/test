import React ,{ Component } from "react" ;
import { Layout , Menu , Icon} from "antd" ;
import { Link } from "react-router-dom" ;
const MenuItem = Menu.Item ;
const { Sider } = Layout;

export default class SiderWrap extends Component {
   render(){
      return (
         <Sider
            trigger={null}
            collapsible
            collapsed={ this.props.collapseFlag }
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
         >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               <MenuItem key="1">
                  <Link to='/table'>
                     <Icon type="user" />
                     <span className="nav-text"> 表格渲染</span>
                  </Link>
               </MenuItem>
               <MenuItem key="2">
                  <Link to='/form'>
                     <Icon type="video-camera" />
                     <span className="nav-text"> form表单</span>
                  </Link>
               </MenuItem>
               <MenuItem key="3">
                  <Link to='/tree'>
                     <Icon type="upload" />
                     <span className="nav-text"> tree</span>
                  </Link>
               </MenuItem>
            </Menu>
         </Sider>
      )
   }
}