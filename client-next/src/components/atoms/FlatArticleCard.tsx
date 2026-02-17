'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { themedPalette } from '../../styles/themes';
import Skeleton from './Skeleton';
import SkeletonTexts from './SkeletonTexts';
import RatioImage from './RatioImage';
import media from '../../styles/media';
import { NewsDataArticle } from '@/types/news';
import useNews from '@/hooks/useNews';
import useHTML from '@/hooks/useHTML';
import { cardDate } from '@/utils/date';

interface ArticleCardProps {
  article: NewsDataArticle;
}

const FlatArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();
  const {preFetchArticle} = useNews();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [description, textToHTML] = useHTML();
  
  const handleClick = useCallback(() => {
    preFetchArticle(article);
    // router.push(`/article/${encodeURI(title)}`); // Link handles navigation
  }, [article, preFetchArticle]); // title removed from deps as it's not needed for preFetchArticle(article) if article is used. Wait, article is used.

  useEffect(() => {
    setTitle(article.title.trim());
    setDate(article.pubDate ? cardDate(article.pubDate) : '');
    setSource(
      article?.source_id
        ? article?.source_id.charAt(0).toUpperCase() + article?.source_id.slice(1)
        : ''
    );
    setImage(article?.image_url || '');
    setAuthor(article?.creator ? article?.creator.join(', ') : '');
    textToHTML(article?.description || '');
  }, [article, description, textToHTML]);

  return (
    <ArticleCardBlock>
      <div className="source">
        {source}
      </div>
      {!!image && (
        <Link 
          href={`/article/${encodeURI(title)}`} 
          onClick={handleClick}
        >
          <RatioImage
            widthRatio={1.916}
            heightRatio={1}
            src={image}
            className="article-thumbnail"
          />
        </Link>
      )}
      <Link
        href={`/article/${encodeURI(title)}`} 
        onClick={handleClick}
      >
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>
      <div className="subinfo">
        <span>{date}</span>
        <div className="separator">·</div>
        <span className="author">
          <b>{author}</b>
        </span>
      </div>
    </ArticleCardBlock>
  );
};

export function ArticleCardSkeleton() {
  return (
    <SkeletonBlock>
      <div className="source">
        <Skeleton width="5rem" />
      </div>
      <div className="article-thumbnail">
        <div className="thumbnail-skeleton-wrapper">
          <Skeleton className="skeleton" />
        </div>
      </div>
      <h2>
        <SkeletonTexts wordLengths={[4, 3, 2, 5, 3, 6]} useFlex />
      </h2>
      <div className="short-description">
        <div className="line">
          <SkeletonTexts wordLengths={[2, 4, 3, 6, 2, 7]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[3, 2, 3, 4, 7, 3]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[4, 3, 3]} />
        </div>
      </div>
      <div className="subinfo">
        <Skeleton width="3em" marginRight="1rem" />
        <Skeleton width="6em" noSpacing />
      </div>
    </SkeletonBlock>
  );
}

const ArticleCardBlock = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  ${media.small} {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
  &:first-child {
    padding-top: 0;
  }
  .source {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: ${themedPalette.text1};
    font-weight: bold;
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: ${themedPalette.text1};
      }
    }
    margin-bottom: 1.5rem;
    ${media.small} {
      margin-bottom: 0.75rem;
    }
  }
  .article-thumbnail {
    margin-bottom: 1rem;
    ${media.small} {
    }
  }
  line-height: 1.5;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: ${themedPalette.text1};
    word-break: keep-all;
    ${media.small} {
      font-size: 1rem;
    }
  }
  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${themedPalette.text2};
    word-break: keep-all;
    overflow-wrap: break-word;
    ${media.small} {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
  }
  .subinfo {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    ${media.small} {
      font-size: 0.75rem;
    }
    span {
    }
    .separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    .source {
      display: flex;
      align-items: center;
      color: ${themedPalette.text1};
      font-weight: bold;
      &:hover {
        color: ${themedPalette.text1};
      }
    }
  }
  .tags-wrapper {
    margin-bottom: -0.875rem;
    ${media.small} {
      margin-bottom: -0.5rem;
    }
  }

  & + & {
    border-top: 1px solid ${themedPalette.border4};
  }
`;

const SkeletonBlock = styled(ArticleCardBlock)`
  h2 {
    display: flex;
    margin-top: 1.375rem;
    margin-bottom: 0.375rem;
  }
  .user-thumbnail-skeleton {
    width: 3rem;
    height: 3rem;
    ${media.small} {
      width: 2rem;
      height: 2rem;
    }
  }
  .thumbnail-skeleton-wrapper {
    width: 100%;
    padding-top: 52.35%;
    position: relative;
    .skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .short-description {
    margin-bottom: 2rem;
    margin-top: 1rem;
    font-size: 1rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.5rem;
    }
  }
  .tags-skeleton {
    line-height: 1;
    font-size: 2rem;
    ${media.small} {
      font-size: 1.25rem;
    }
  }
`;

export default React.memo(FlatArticleCard);
