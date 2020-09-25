import { useRouter } from "next/router";
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import SearchForm from "@/components/SearchForm";
import SEO from "@/components/SEO";
import { IProduct } from "./types";
import { client } from "@/lib/prismic";
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

type ServerSideProps = {
  searchResults: Document[];
}

export default function Search({ searchResults }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { q } = router.query;

  return (
    <div>
      <SEO title={`Results for: ${q}`} />

      <SearchForm />

      <section>
        <h1>Results for: {q}</h1>
        <ul>
          {searchResults.map(product => {
            return (
              <li>
                <Link href={`/catalog/products/${product.uid}`}>
                  <a>{product.data.title}</a>
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

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q))
  ])

  return {
    props: {
      searchResults: searchResults.results,
    }
  };
}