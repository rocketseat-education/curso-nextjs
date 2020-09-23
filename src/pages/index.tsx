import Head from 'next/head'
import Link from 'next/link'

import SearchForm from '../components/SearchForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DevCommerce</title>
      </Head>

      <SearchForm />

      <div className={styles.container}>
        <h1>Produtos recomendados</h1>
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
      </div>
    </div>
  )
}
