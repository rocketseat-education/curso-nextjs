import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';

import SearchForm from '@/components/SearchForm';
import SEO from '@/components/SEO';
import { SectionTitle } from '@/styles/pages/Home';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';

interface HomeServerSideProps {
  recommendedProducts: Document[];
}

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;
  
export default function Home({ recommendedProducts }: HomeProps) {
  const [categories, setCategories] = useState<Document[]>([]);
  
  useEffect(() => {
    client().query([
      Prismic.Predicates.at('document.type', 'category')
    ]).then(categories => {
      setCategories(categories.results)
    })
  }, []);

  return (
    <div>
      <SEO title="Home" />

      <SearchForm />

      <nav>
        {categories.map(category => {
          return (
            <Link key={category.id} href={`/catalog/categories/${category.uid}`}>
              <a>{category.data.title}</a>
            </Link>
          )
        })}
      </nav>

      <section>
        <SectionTitle>Produtos recomendados</SectionTitle>
        <ul>
          {recommendedProducts.map(product => {
            return (
              <li key={product.id}>
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

export const getServerSideProps: GetServerSideProps<HomeServerSideProps> = async (context) => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
