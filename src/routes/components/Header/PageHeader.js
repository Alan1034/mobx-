import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Breadcrumb } from "antd";
import styles from "./Header.less";
@inject("stores")
@observer
class PageHeader extends Component {
  render() {
    const { stores, location } = this.props;
    const menuMaps = stores.MenuModel.menuMaps;

    const pathSnippets = location.pathname.split("/").filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      for (let i = 0; i < menuMaps.length; i++) {
        let menu = menuMaps[i];
        if (url === menu.menuUrl) {
          // let children = menu.children;
          let href = "#" + url;
          //拥有子菜单一般都不是连接菜单
          // if(children && children.length > 0){
          //   href = '';
          // }
          if (menu.unnavigable) {
            href = "";
          }
          return {
            key: menu.menuId,
            href: href,
            title: menu.menuName
          };
        }
      }
      return {
        key: url,
        href: url,
        title: undefined
      };
    });

    //最前面增加首页连接
    // let items = [{
    //   key: 'homeBread',
    //   href: '#',
    //   title: '首页'
    // }].concat(extraBreadcrumbItems);

    // let items = [
    //   {
    //     key: "homeBread",
    //     href: "",
    //     title: ""
    //   }
    // ].concat(extraBreadcrumbItems);

    const breadItems = extraBreadcrumbItems.map((item, index) => {
      return (
        <Breadcrumb.Item key={index}>
          <a href={item.href}>{item.title}</a>
        </Breadcrumb.Item>
      );
    });

    return (
      <div className={styles.pageHeader}>
        {extraBreadcrumbItems.length > 0 ? (
          <Breadcrumb>{breadItems}</Breadcrumb>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(PageHeader);
