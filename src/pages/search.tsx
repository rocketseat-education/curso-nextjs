import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import SearchForm from "../components/SearchForm";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IProduct } from "./types";

type ServerSideProps = {
  searchResults: IProduct[]
}

export default function Search({ searchResults }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { q } = router.query;

  return (
    <div>
      <Head>
        <title>Searching for: {q} | DevCommerce</title>
      </Head>

      <SearchForm />

      <section>
        <h1>Results for: {q}</h1>
        <ul>
          {searchResults.map(product => {
            return (
              <li>
                <Link href={`/catalog/products/${product.id}`}>
                  <a>{product.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const { q } = context.query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?q=${q}`)
  const searchResults: IProduct[] = await response.json();

  return {
    props: {
      searchResults,
    }
  };
}