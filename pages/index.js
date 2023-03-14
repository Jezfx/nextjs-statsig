/* eslint-disable */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useGate, useExperiment } from "statsig-react";

import { rudderstackTrack } from "../utils/tracking";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (context) => {
  const bannerUit = context.res.getHeaders().banner_uit;
  const background = context.res.getHeaders().background;

  return {
    props: {
      bannerUit,
      background,
    },
  };
};

const banner = {
  daily_deals: "Daily Deals",
  items_you_may_like: "Items you may like",
  buy_again: "Buy Again",
};

export default function Home({ bannerUit, background }) {
  // const { config } = useExperiment("homepage_banner");

  const handleOnShopClick = () => {
    rudderstackTrack("Banner Click", bannerUit);
    Router.push("/shop");
  };

  return (
    <div className={styles.container} style={{ background }}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h1 className={styles.title}>Banner: {props.bannerUit}</h1> */}
        {/* <h1 className={styles.title}>
          useExperiment: {config.value.banner_unit}
        </h1> */}

        <h1>{banner[bannerUit]}</h1>
        <button onClick={handleOnShopClick}>Shop</button>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Link href="/shop">
            <a className={styles.card}>Shop</a>
          </Link>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
