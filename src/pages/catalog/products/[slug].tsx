import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { RichText } from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents';

type ProductStaticProps = {
  product: Document;
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

  const productDescription = useMemo(() => {
    return RichText.asHtml(product.data.description);
  }, [product.data.description])

  return (
    <div>
      <SEO title={product.data.title} />

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Product: {product.data.title}</h1>
      <h2>Price: {product.data.price}</h2>

      <div dangerouslySetInnerHTML={{ __html: productDescription }}></div>

      { isAddToCartModalOpen && <AddToCartModal title={product.data.title} /> }

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

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}