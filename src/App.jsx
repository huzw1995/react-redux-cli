import React from "react";
import classnames from "classnames";
import Styles from "./Category.less";
import Search from "@components/search/Search";
import Menu from "../container/Menu";

const CategoryUi = (props) => {
  const { tabIndex, onCategoryUiClick, type } = props;
  return (
    <div className={Styles.CategoryWrap}>
      <nav>
        <ul>
          <li
            className={tabIndex === 0 ? Styles.active : ""}
            onClick={onCategoryUiClick(0)}
          >
            分类
            <li
              className={tabIndex === 1 ? Styles.active : ""}
              onClick={onCategoryUiClick(1)}
            >
              食材
            </li>
            <li
              className={
                tabIndex === 0
                  ? Styles.slide
                  : classnames(Styles.slide, Styles.right)
              }
            ></li>
          </li>
        </ul>
      </nav>
      <Search outerbg="#fff" innerbg="#efefef" hasborder={false}></Search>
      <Menu type={type}></Menu>
    </div>
  );
};

export default CategoryUi;
