import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { increment, decrement } from "../store/reducers/counter";
import { useEffect } from "react";
import { CONNECT } from "../store/reducers/coin";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    router.push("/trading");
  }, [dispatch]);

  const count = useSelector((state) => state.counter.value);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}
