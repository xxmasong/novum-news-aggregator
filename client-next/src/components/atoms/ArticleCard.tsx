'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import RatioImage from './RatioImage';
import { themedPalette } from '@/styles/themes';
import SkeletonTexts from './SkeletonTexts';
import Skeleton from './Skeleton';
import { mediaQuery } from '@/styles/media';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NewsDataArticle } from '@/types/news';
import { cardDate } from '@/utils/date';
import useHTML from '@/hooks/useHTML';
import useNews from '@/hooks/useNews';

export type ArticleCardProps = {
  article: NewsDataArticle;
  forHome?: boolean;
  forArticle?: boolean;
};

function ArticleCard({ article, forHome, forArticle }: ArticleCardProps) {
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
  }, [article, preFetchArticle]);

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
    <Block
      $forHome={!!forHome}
      $forArticle={!!forArticle}
    >
      {image && (
        <StyledLink 
          href={`/article/${encodeURI(title)}`} 
          onClick={handleClick}
        >
          <RatioImage
            widthRatio={1.916}
            heightRatio={1}
            src={image}
          />
        </StyledLink>
      )}
      <Content $hasImage={!!image}>
        <StyledLink 
          href={`/article/${encodeURI(title)}`} 
          onClick={handleClick}
        >
          <h4>{title}</h4>
          <div className="description-wrapper" 
            dangerouslySetInnerHTML={{
            __html: `${description}`
          }} />
        </StyledLink>
        <div className="sub-info">
          <span>{date}</span>
        </div>
      </Content>
      {(author || source) &&
        <Author>
          <div className="userinfo">
            {author &&
              <span>{author}</span>
            }
          </div>
          <div className="sub-info"> 
            {source &&
              <span><b>{source}</b></span>
            }
          </div>
        </Author>
      }
    </Block>
  );
}

export function ArticleCardSkeleton({
  forHome,
  forArticle,
}: {
  forHome?: boolean;
  forArticle?: boolean;
}) {
  return (
    <SkeletonBlock $forHome={!!forHome} $forArticle={!!forArticle}>
      <div className="skeleton-thumbnail-wrapper">
        <Skeleton className="skeleton-thumbnail"></Skeleton>
      </div>
      <Content $hasImage $isSkeleton>
        <h4>
          <SkeletonTexts wordLengths={[2, 4, 3, 6, 5]} />
        </h4>
        <div className="description-wrapper">
          <div className="lines">
            <div className="line">
              <SkeletonTexts wordLengths={[2, 4, 3, 6, 2, 7]} useFlex />
            </div>
            <div className="line">
              <SkeletonTexts wordLengths={[3, 2]} />
            </div>
          </div>
        </div>
        <div className="sub-info">
          <span>
            <Skeleton width="3rem" />
          </span>
        </div>
      </Content>
      <Author>
        <div className="userinfo">
          <span>
            <Skeleton width="6rem" />
          </span>
        </div>
        <div className="sub-info">
          <span>
            <Skeleton width="6rem" />
          </span>
        </div>
      </Author>
    </SkeletonBlock>
  );
}

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const Block = styled.div<{ $forHome: boolean; $forArticle: boolean }>`
  width: 25rem;
  background: ${themedPalette.bg_element1};
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  transition: 0.25s box-shadow ease-in, 0.25s transform ease-in;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.08);
    ${mediaQuery(1024)} {
      transform: none;
    }
  }
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${(props) =>
    !props.$forHome &&
    !props.$forArticle &&
    css`
      ${mediaQuery(1440)} {
        width: calc(25% - 2rem);
      }
      ${mediaQuery(1312)} {
        width: calc(33% - 1.8125rem);
      }
    `}

  ${mediaQuery(1056)} {
    width: calc(50% - 2rem);
  }
  ${mediaQuery(767)} {
    margin: 0;
    width: 100%;
    & + & {
      margin-top: 1rem;
    }
  }
`;

const Content = styled.div<{ $hasImage: boolean; $isSkeleton?: boolean; }>`
  padding: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  h4 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    ${(props) =>
      props.$isSkeleton &&
      css`
        text-overflow: initial;
      `}
    color: ${themedPalette.text1};
    ${mediaQuery(767)} {
      white-space: initial;
    }
  }
  .description-wrapper {
    flex: 1;
  }
  p {
    margin: 0;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    ${(props) => props.$hasImage ? css`
      height: 6.5625rem;
      -webkit-line-clamp: 5;
    ` : css`
      height: 13.125rem;
      -webkit-line-clamp: 10;
    `}
    overflow: hidden;
    text-overflow: ellipsis;  
    color: ${themedPalette.text2};
    margin-bottom: 0.5rem;
  }
  .sub-info {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${themedPalette.text3};
  }
`;

const Author = styled.div`
  padding: 0.625rem 1rem;
  border-top: 1px solid ${themedPalette.border4};
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  justify-content: space-between;
  .userinfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    span {
      color: ${themedPalette.text1};
    }
  }
`;

const SkeletonBlock = styled(Block)`
  .skeleton-thumbnail-wrapper {
    width: 100%;
    padding-top: 52.19%;
    position: relative;
    .skeleton-thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .lines {
    height: 3.9375rem;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.3rem;
    }
  }
`;

export default React.memo(ArticleCard);
