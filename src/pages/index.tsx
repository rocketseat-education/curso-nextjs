import Head from 'next/head'
import Link from 'next/link'
import React from 'react';

import SearchForm from '../components/SearchForm';

import { SectionTitle } from '../styles/pages/Home';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DevCommerce</title>
      </Head>

      <SearchForm />

      <section>
        <SectionTitle>Produtos recomendados</SectionTitle>
        <ul>
          <li>
            <Link href="/catalog/products/product-one">
              <a>Product One</a>
            </Link>
          </li>
          <li>
            <Link href="/catalog/products/product-two">
              <a>Product Two</a>
            </Link>
          </li>
          <li>
            <Link href="/catalog/products/product-three">
              <a>Product Three</a>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
