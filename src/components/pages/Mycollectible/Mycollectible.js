
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { apiCallGet } from '../../../axiosApi/Axios';
import CommonTable from '../../common/Commontable/Commontable';
import PageHeading from '../../common/PageHeading/PageHeading';
import Pagination from '../../common/Pagination/Pagination';
import styles from './Mycollectible.module.scss';

const Mycollectible = () => {
  const [collectible, setCollectible] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userId = useSelector((state) => state.userDetails.userId)
  const itemsPerPage = 10;
  const Collectiblestable = [
    {
      label: 'Sr.No.',
      position: 'center',
    },
    {
      label: 'Asset Image',
      position: 'center',
    },
    {
      label: 'Asset Name',
      position: 'center',
    },
    {
      label: 'Date Claimed on',
      position: 'center',
    },
    {
      label: 'Asset ID',
      position: 'center',
    },
  ];

  const getCollectiblesData = async () => {
    try {
      let response = await apiCallGet(
        `/api/v1/satyug/users/collective/${userId}/10/${currentPage}`,
        {},
        true,
        false
      );

      if (response.status === 200) {
        setCollectible(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollectiblesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getTotalPages = () => {
    return Math.ceil(collectible?.count / itemsPerPage);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <section className={styles.my_collectibles}>
        <Container>
          <div className={styles.collectibles_header}>
            <PageHeading heading="My Collectibles" className={styles.heading} />
            <ul>
              <li>
                <h4>Leadership Points:</h4>
                <strong>{collectible?.leaderPoints || 0}</strong>
              </li>
              <li>
                <h4>Karma Points:</h4>
                <strong>{collectible?.karmaPoint || 0}</strong>
              </li>
            </ul>
          </div>
          <CommonTable fields={Collectiblestable} className={styles.collectibles_table}>
            {collectible?.count > 0 ? (
              <>
                {collectible?.rows?.map((data, index) => (
                  <tr key={data?.id}>
                    <td className={styles.serial}>
                      <label className="table_heading">Sr.no.</label>
                      <span className="table_data">
                      {(index + 1) + (currentPage - 1) * itemsPerPage}
                      </span>
                    </td>
                    <td>
                      <label className="table_heading">Asset image</label>
                      <span className="table_data">
                        <img className={styles.table_img} src={data?.Collectable?.image} alt="avatar" />
                      </span>
                    </td>
                    <td className={styles.asset_name}>
                      <label className="table_heading">Asset name</label>
                      <span className="table_data">
                        {data?.Collectable?.title}
                      </span>
                    </td>
                    <td>
                      <label className="table_heading">Date claimed on</label>
                      <span className="table_data">{moment(data?.createdAt).format('DD-MM-YYYY')}</span>
                    </td>
                    <td>
                      <label className="table_heading">Asset id</label>
                      <span className="table_data">{data?.assetKey}</span>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              null
            )}
          </CommonTable>
          {collectible?.count > 10 ? (
            <Pagination
              className="justify-content-center"
              pages={getTotalPages()}
              activePage={currentPage}
              handlePagination={handlePagination}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default Mycollectible;
