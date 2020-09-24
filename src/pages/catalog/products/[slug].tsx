import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { IProduct } from '@/pages/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

type ProductStaticProps = {
  product: IProduct;
}

interface ProductProps extends InferGetStaticPropsType<typeof getStaticProps> {}

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => (
    <p>Carregando...</p>
  ),
});

export default function Product({ product }: ProductProps) {
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Product "{product.id}" | DevCommerce</title>
      </Head>

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Product: {product.title}</h1>
      <h2>Price: {product.price}</h2>

      { isAddToCartModalOpen && <AddToCartModal title={product.title} /> }

      <button onClick={() => setIsAddToCartModalOpen(true)}>
        Add to cart
      </button>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductStaticProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}