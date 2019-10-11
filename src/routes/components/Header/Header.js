import React, { Component } from "react";
import {
  Menu,
  Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  message
} from "antd";
import moment from "moment";
import groupBy from "lodash/groupBy";
import Debounce from "lodash-decorators/debounce";
import NoticeIcon from "ant-design-pro/lib/NoticeIcon";
import HeaderSearch from "ant-design-pro/lib/HeaderSearch";
import styles from "./Header.less";
import "./header.scss";
import "../../../src/styles/less/custom.less";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import LoginService from "../../services/LoginService";
import avatarSrc from "../../asset/images/Ci0vElqsyv6AJ-tdAAAachHYd0Q074.jpg";
@inject("stores", "storesMenuModel")
// @inject("storesMenuModel")
@observer
class Header extends Component {
  state = {
    searchTips: [],
    loading: false
  };

  constructor(props) {
    super(props);
    this.store = this.props.stores;

    this.storesMenuModel = this.props.storesMenuModel;
  }
  componentDidMount() {
    LoginService.getLoginInfo({}).then(result => {
      if (!result) {
        return;
      }
      let data = result.resultObject;
      let success = result.code;
      if (success === "0") {
        //登录状态变更
        this.store.LoginModel.login(data.userInfo);
        //菜单数据

        this.store.MenuModel.setMenuInfos(data.menuInfo);
      } else {
        this.handleMenuClick({ key: "logout" });
      }
    });
  }
  componentWillMount() {
    // let usercode = this.store.LoginModel.getSessionUser();// 接上4A要去掉
    // if(!usercode) { // 接上4A要去掉
    //   return; // 接上4A要去掉
    // } // 接上4A要去掉  LoginService.getLoginInfo({}).then(result => {
  }

  // componentWillUnmount() {
  //   //this.triggerResizeEvent.cancel();
  // }

  handleMenuClick = ({ key }) => {
    //加载中
    this.setState({
      loading: true
    });
    if (key === "triggerError") {
    }
    if (key === "logout") {
      LoginService.logout({}) // 4A退出登陆
        .then(result => {
          this.setState({
            loading: false
          });

          if (!result.head) {
            return;
          }
          let success = result.code;
          let remark = result.message;
          if (success !== "0") {
            message.error(remark);
          } else {
          }
        });
      //登录状态变更
      this.store.LoginModel.logout();
      //菜单数据清空
      this.store.MenuModel.setMenuInfos([]);
      this.props.history.replace("/login");
    }
  };

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: "",
          processing: "blue",
          urgent: "red",
          doing: "gold"
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, "type");
  }
  toggle = () => {
    let collapsed = this.storesMenuModel.collapsed;
    // let onCollapse =  this.storesMenuModel.toggle;

    this.storesMenuModel.toggle(!collapsed);
    this.triggerResizeEvent();
  };
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      stores,
      isMobile,
      onNoticeVisibleChange,
      onNoticeClear
    } = this.props;

    let loginModel = stores.LoginModel;
    let currentUser = {
      name: loginModel.username,
      // avatar: loginModel.idcard, //userInfo
      avatar: avatarSrc,
      notifyCount: 0
    };

    let collapsed = this.store.MenuModel.collapsed;

    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.handleMenuClick.bind(this)}
      >
        {/* <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    const menuMaps = this.store.MenuModel.menuMaps; //所有菜单数据

    return (
      <div className={styles.header}>
        {isMobile && [<Divider type="vertical" key="line" />]}
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={this.state.searchTips}
            onSearch={value => {
              let tips = [];
              for (let i = 0; i < menuMaps.length; i++) {
                let menu = menuMaps[i];
                if (menu.menuName.indexOf(value) !== -1) {
                  tips.push(menu.menuName);
                }
              }
              this.setState({
                searchTips: tips
              });
            }}
            onPressEnter={value => {
              for (let i = 0; i < menuMaps.length; i++) {
                let menu = menuMaps[i];
                if (menu.menuName === value) {
                  this.props.history.replace(menu.menuUrl);
                }
              }
            }}
          />

          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {}}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={false}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData["通知"]}
              title="通知"
              emptyText="你已查看所有通知"
              // emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData["消息"]}
              title="消息"
              emptyText="您已读完所有消息"
              // emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData["待办"]}
              title="待办"
              emptyText="你已完成所有待办"
              // emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.avatar}
                />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
