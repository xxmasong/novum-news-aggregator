import styled from 'styled-components';
import media from '@/styles/media';
import ArticleCardGrid from '@/components/atoms/ArticleCardGrid';
import { themedPalette } from '@/styles/themes';
import useRelatedNews from '@/hooks/useRelatedNews';

function RelatedArticle() {
  const { articles, loading} = useRelatedNews();

  return (
    <>
      <Background>
        <Title>Recommended Articles</Title>
        <Wrapper>
          <ArticleCardGrid 
            articles={articles!}
            loading={!articles.length || loading}
            forArticle 
          />
        </Wrapper>
      </Background>
      <PullUp />
    </>
  );
}

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  color: ${themedPalette.text2};
  margin-bottom: 3.5rem;
  ${media.custom(1376)} {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  ${media.medium} {
    font-size: 1.25rem;
  }
`;

const Background = styled.div`
  z-index: 5;
  position: relative;
  padding-top: 4rem;
  padding-bottom: 4rem;

  ${media.custom(1376)} {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  margin-top: 4rem;
  background: ${themedPalette.bg_page1};
  box-shadow: 0px -16px 16px rgb(0 0 0 / 4%);
`;
const Wrapper = styled.div`
  width: 1376px;
  margin: 0 auto;
  padding-bottom: 3rem;
  ${media.xlarge} {
    width: 1024px;
  }
  ${media.custom(1056)} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const PullUp = styled.div`
  margin-bottom: -4rem;
`;

export default RelatedArticle;
