import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';

import SearchForm from '../components/SearchForm';

import { SectionTitle } from '../styles/pages/Home';

interface ICategory {
  id: number
  title: string
}

interface IProduct {
  id: number
  price: string
  title: string
  slug: string
}

export default function Home() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:3333/categories').then(response => {
      response.json().then(data => {
        setCategories(data)
      })
    })

    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data)
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
              <li>
                <Link href={`/catalog/products/${product.slug}`}>
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
