import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

interface ICategory {
  id: string
  title: string
}

interface IProduct {
  id: number
  price: string
  title: string
  slug: string
}

interface CategoryStaticProps {
  products: IProduct[];
}

type CategoryProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  const { slug } = router.query;

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
              <li key={product.id}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories: ICategory[] = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    };
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryStaticProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    }
  }
}