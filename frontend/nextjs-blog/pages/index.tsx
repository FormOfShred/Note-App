import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Header from '../components/Header';

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header></Header>
    <main>
    <div className="p-5 lg-body-tertiary">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Welcome to Notery!</h1>
        <p className="col-md-8 fs-4">Organize your thoughts, ideas, and important information with ease. Notery makes it simple to create and manage your notes effortlessly. Sign up now and start organazing your notes with Notery!</p>
        <a className="btn btn-primary btn-lg" type="button" href="/register">Sign up</a>
      </div>
    </div>
    </main>
    </>  
  )
}
