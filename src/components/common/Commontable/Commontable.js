import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './Commontable.module.scss';


const Commontable = ({ className, fields, children, noRecordFound }) => {

    return (
        <Table responsive className={`${styles.table} ${className || ""}`}>
            {fields && <thead>
                <tr>
                    {fields?.map((item) => (
                        <th key={item.label} className={`text-${item.position || "start"}`}>
                            {item.label}
                        </th>
                    ))}
                </tr>
            </thead>}
            <tbody>
                {
                    children ||
                    noRecordFound ||
                    <tr className={styles.no_record}>
                        <td colSpan={fields?.length}>
                            {noRecordFound || (
                                <div className={styles.no_record_box}>
                                    {/* <NoRecord /> */}
                                    <h4>No Record Found</h4>
                                </div>
                            )}
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    )
}
export default Commontable