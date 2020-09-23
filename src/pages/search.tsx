import { useRouter } from "next/router";
import Head from 'next/head';
import SearchForm from "../components/SearchForm";

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return (
    <div>
      <Head>
        <title>Searching for: {q} | DevCommerce</title>
      </Head>

      <h1>Searching for: {q}</h1>

      <SearchForm />
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log('heyyy');

  return {
    props: {}
  };
}