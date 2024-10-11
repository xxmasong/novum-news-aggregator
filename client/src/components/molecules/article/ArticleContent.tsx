import styled from 'styled-components';
import media from '@/styles/media';
import { themedPalette } from '@/styles/themes';
import { useEffect, useState } from 'react';
import useHTML from '@/hooks/useHTML';
import useNews from '@/hooks/useNews';

function ArticleContent () {
  const {article} = useNews();
  const [author, setAuthor] = useState('');
  const [content, textToHTML] = useHTML();

  console.log(article)

  useEffect(() => {
    setAuthor(article?.creator ? article?.creator.join(', ') : '');
    textToHTML(`${article?.description}... ${article?.content}` || 'See link for more details');
  }, [article, textToHTML]);

  return (
    <ArticleContentBlock>
      <Content
        dangerouslySetInnerHTML={{ __html: `${content}` }}
      />
      <SubInfo>
        <div className="information">
          {author && (
            <>
              <span>By </span>
              <span className="text">{author}</span>
            </>
          )}
        </div>
      </SubInfo>
    </ArticleContentBlock>
  );
}

const ArticleContentBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.small} {
    width: 100%;
  }
`;

const Content = styled.div``;

const SubInfo = styled.div`
  margin-top: 2rem;
  align-items: center;
  font-size: 1rem;
  color: ${themedPalette.text2};
  /* font-family: 'Spoqa Han Sans'; */
  display: flex;
  justify-content: space-between;
  .information {
    font-size: 0.875rem;
    .text {
      color: ${themedPalette.text1};
      font-weight: bold;
      &:hover {
        color: ${themedPalette.text2};
      }
    }
  }
  ${media.small} {
    margin-bottom: 0.75rem;
  }
`;

export default ArticleContent;
