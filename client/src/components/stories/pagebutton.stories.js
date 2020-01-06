import React from "react";
import PageButton from "../PageButton/PageButton.js"

export default {title: "PageButton"}

export const prevPageButton = () => <PageButton prevPage={"token"} />;
export const nextPageButton = () => <PageButton nextPage={"token"} />;
