'use client';

import styled from 'styled-components';
import ArticleResponsive from '../../atoms/ArticleResponsive';
import { themedPalette } from '@/styles/themes';
import media from '@/styles/media';
import { MdOpenInNew } from 'react-icons/md';
import { articleDate } from '@/utils/date';
import { useEffect, useState } from 'react';
import useNews from '@/hooks/useNews';

function ArticleHead() {
  const {article} = useNews();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setTitle(article?.title.trim() || "");
    if (article?.title) {
        document.title = `${article.title} - Novum News`;
    }
    setDate(article?.pubDate ? articleDate(article.pubDate) : "");
    setThumbnail(
      article?.image_url &&
        !article?.content?.includes(encodeURI(article.image_url))
        ? article?.image_url
        : null
    );
    setSource(
      article?.source_id
        ? article.source_id.charAt(0).toUpperCase() +
            article.source_id.slice(1)
        : null
    );
    
    return () => {
        document.title = 'Novum News Aggregator';
    };
  }, [article]);

  return (
    <ArticleHeadBlock>
      <div className="head-wrapper">
        <h1>{title}</h1>
        <SubInfo>
          <div className="information">
            <span className="date">{date}</span>
            <br/>
            {source && (
              <span className="source">{source}</span>
            )}
          </div>
          {article?.link && (
            <External href={article.link} target="_blank">
              <MdOpenInNew />
              <ExternalText>Read<br/>More</ExternalText>
            </External>
          )}          
        </SubInfo>
      </div>
      {thumbnail && (
        <Thumbnail
          src={thumbnail}
          alt="article-thumbnail"
          key={thumbnail}
        />
      )}
    </ArticleHeadBlock>
  );
};

const ArticleHeadBlock = styled(ArticleResponsive)`
  margin-top: 5rem;
  .head-wrapper {
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  h1 {
    /* font-family: 'Spoqa Han Sans'; */
    letter-spacing: -0.004em;
    margin-top: 0;
    font-size: 2rem;
    font-weight: 800;
    color: ${themedPalette.text1};
    margin-bottom: 2rem;
    word-break: keep-all;
    transition: color 0.125s ease-in;
  }
  ${media.medium} {
    margin-top: 2rem;
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const SubInfo = styled.div`
  align-items: center;
  color: ${themedPalette.text2};
  /* font-family: 'Spoqa Han Sans'; */
  display: flex;
  justify-content: space-between;
  .information {
    .date {
      font-size: 0.875rem;
    }
    .source {
      font-size: 1rem;
      font-weight: bold;
      color: ${themedPalette.text1};
      &:hover {
        color: ${themedPalette.text2};
      }
    }
  }
  ${media.small} {
    margin-bottom: 0.5rem;
  }
`;

const Thumbnail = styled.img`
  max-height: 100vh;
  max-width: 100%;
  width: auto;
  margin: 0 auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin-top: 1rem;
  ${media.small} {
    margin-top: 1rem;
  }
`;

const External= styled.a`
  background: ${themedPalette.bg_element1};
  border: 1px solid ${themedPalette.border2};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
  height: 2rem;
  border-radius: 0.75rem;
  outline: none;
  text-decoration: none;
  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
    color: ${themedPalette.text3};
  }
  span {
    font-size: 0.75rem;
    font-weight: bold;
    color: ${themedPalette.text3};
  }
`;

const ExternalText = styled.div`
  color: ${themedPalette.text2};
  line-height: 1;
  font-size: 0.5rem;
  font-weight: bold;
`;

export default ArticleHead;
