import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Zcon from "zteui-icon";
import "../../styles/menu.scss";
// import { log } from 'lodash-decorators/utils';
import * as mobx from "mobx";
const { autorun } = mobx;

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

@inject("stores", "storesMenuModel")
@observer
class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.stores;
    this.state = {
      openKeys: [`/${this.props.location.pathname.split("/")[1]}`],
      menuInfos: {}
    };
    this.storesMenuModel = this.props.storesMenuModel;
  }

  componentWillMount() {
    // this.watchMenuInfos()
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : []
    });
  };

  handleSubMenu = e => {
    this.props.history.push(e.key);
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter(item => item.menuName && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => !!item);
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (
      item.children &&
      item.children.some(child => child.menuName && !child.hideInMenu)
    ) {
      return (
        <SubMenu
          className="datMenuItem"
          title={
            item.menuIcon ? (
              <span>
                <Zcon
                  style={{ marginRight: "15px", fontSize: "20px" }}
                  // className={`iconfont-custom  ${item.menuIcon}`}
                  type={`${item.menuIcon}`}
                />
                <span>{item.menuName}</span>
              </span>
            ) : (
              item.menuName
            )
          }
          key={item.menuUrl}
          // onTitleClick={this.handleSubMenu}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.menuUrl} className="datMenuItem">
          <Link
            to={item.menuUrl}
            replace={item.menuUrl === this.props.location.pathname}
            onClick={
              this.props.isMobile
                ? () => {
                    this.props.onCollapse(true);
                  }
                : undefined
            }
          >
            <Zcon
              style={{ marginRight: "15px", fontSize: "20px" }}
              // className={`iconfont-custom  ${item.menuIcon}`}
              type={`${item.menuIcon}`}
            />
            <span>{item.menuName}</span>
          </Link>
        </Menu.Item>
      );
    }
  };
  watchMenuInfos() {
    autorun(() => {
      if (this.store.MenuModel.menuInfos) {
        this.setState({
          menuInfos: this.store.MenuModel.menuInfos
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    if (pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: [`/${pathname.split("/")[1]}`]
      });
    }
  }

  render() {
    let collapsed = this.storesMenuModel.collapsed;
    let menuInfos = this.storesMenuModel.menuInfos;
    const { pathname } = this.props.location;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={180}
        collapsedWidth={50}
      >
        <div className={this.storesMenuModel.collapsed ? "" : "menuCollapsed"}>
          <div className="menu-title">
            <img
              style={{ height: "28px", width: "27px" }}
              alt=""
              src={require("../../asset/images/logo.png")}
            />
            <span className="title">{collapsed ? "" : document.title}</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            onClick={this.onClickMenu}
          >
            {this.getNavMenuItems(menuInfos)}
          </Menu>
        </div>
      </Sider>
    );
  }
}

export default (LeftMenu = withRouter(LeftMenu));
