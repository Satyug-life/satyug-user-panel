import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from "./AuthLayout.module.scss";
import Header from '../../common/Header/Header';

const AuthLayout = () => {
    return (
        <main className={styles.auth_layout}>
            <Header />
            <div className={styles.auth_inner}>
                <Outlet />
            </div>
        </main>
    )
}

export default AuthLayout
