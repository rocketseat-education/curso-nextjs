import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IProduct {
  id: number
  price: string
  title: string
  slug: string
}

export default function Category() {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  const { slug } = router.query;

  useEffect(() => {
    if (!slug) {
      return;
    }

    fetch(`http://localhost:3333/products?category_id=${slug}`).then(response => {
      response.json().then(data => {
        setProducts(data)
      })
    })
  }, [slug])

  return (
    <div>
      <Head>
        <title>Category "{slug}" | DevCommerce</title>
      </Head>

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Category: {slug}</h1>

      <section>
        <ul>
          {products.map(product => {
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
  );
}