import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ICategory, IProduct } from '@/pages/types';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

interface CategoryStaticProps {
  category: Document;
  products: Document[];
}

type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Category({ products, category }: CategoryProps) {
  return (
    <div>
      <SEO title={category.data.title} />

      <Link href="/">
        <a>Back to home</a>
      </Link>
      
      <h1>Category: {category.data.title}</h1>

      <section>
        <ul>
          {products.map(product => {
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

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id)
  ])

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  }
}