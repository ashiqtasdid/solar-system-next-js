import Head from "next/head";
import SolarSystem from "../components/SolarSystem";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Solar System</title>
        <meta name="description" content="3D Solar System Model with react-three-fiber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: "100vh" }}>
        <SolarSystem />
      </main>
    </div>
  );
}
