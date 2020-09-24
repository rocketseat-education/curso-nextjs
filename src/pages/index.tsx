import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';

import SearchForm from '../components/SearchForm';

import { SectionTitle } from '../styles/pages/Home';
import { ICategory, IProduct } from './types';

interface HomeServerSideProps {
  recommendedProducts: IProduct[];
}

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;
  
export default function Home({ recommendedProducts }: HomeProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then(response => {
      response.json().then(data => {
        setCategories(data)
      })
    })
  }, []);

  return (
    <div>
      <Head>
        <title>DevCommerce</title>
      </Head>

      <SearchForm />

      <nav>
        {categories.map(category => {
          return (
            <Link key={category.id} href={`/catalog/categories/${category.id}`}>
              <a>{category.title}</a>
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

export const getServerSideProps: GetServerSideProps<HomeServerSideProps> = async (context) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts: IProduct[] = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
