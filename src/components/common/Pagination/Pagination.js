// Pagination.js
import React from 'react';
import styles from "./Pagination.module.scss";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { LeftArrow, RightArrow } from '../../../assets/svg/svgicons';

const Pagination = ({ pages, handlePagination, handlePrev, className, handleNext, activePage }) => {
    return (
      <>
        <BootstrapPagination className={`${styles.pagination} ${className || ""}`}>
          <BootstrapPagination.Prev onClick={handlePrev}><LeftArrow /></BootstrapPagination.Prev>
          {Array.from({ length: pages }).map((item, index) => {
            return (
              <BootstrapPagination.Item onClick={() => handlePagination(index + 1)} key={index} active={activePage === index + 1}>
                {index + 1}
              </BootstrapPagination.Item>
            );
          })}
          <BootstrapPagination.Next onClick={handleNext}>
            <RightArrow />
          </BootstrapPagination.Next>
        </BootstrapPagination>
      </>
    )
  }
  
export default Pagination;
