import Link from 'next/link';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { IProduct } from '../../types';
import { useRouter } from 'next/router';

type ProductStaticProps = {
  product: IProduct;
}

interface ProductProps extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Product({ product }: ProductProps) {
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

  const response = await fetch(`http://localhost:3333/products/${slug}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}