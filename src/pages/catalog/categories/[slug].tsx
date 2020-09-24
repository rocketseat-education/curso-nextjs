import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ICategory, IProduct } from '@/pages/types';
import SEO from '@/components/SEO';

interface CategoryStaticProps {
  category: ICategory;
  products: IProduct[];
}

type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <div>
      <SEO title={category.title} />

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Category: {slug}</h1>

      <section>
        <ul>
          {products.map(product => {
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
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const categories: ICategory[] = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    };
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryStaticProps> = async (context) => {
  const { slug } = context.params;

  const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`);
  const category = await categoryResponse.json();

  const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`);
  const products = await productsResponse.json();

  return {
    props: {
      category,
      products,
    },
    revalidate: 60,
  }
}