import ArticlePage from '@/components/pages/ArticlePage';

export default async function Page({ params }: { params: Promise<{ urlTitle: string }> }) {
  const { urlTitle } = await params;
  return <ArticlePage urlTitle={urlTitle} />;
}
