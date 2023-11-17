import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';
import { orange } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function TitlebarImageList() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const mobileQuery = useMediaQuery('(max-width:614px)');

  return (
    <ImageList sx={{ width: mobileQuery ? '100%' : 350, height: mobileQuery ? 192 : 230 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          <ArrowDownIcon sx={{ color: 'rgb(255, 105, 0)' }} />
          <ArrowDownIcon sx={{ color: 'rgb(255, 105, 0)' }} />
          <ArrowDownIcon sx={{ color: 'rgb(255, 105, 0)' }} />
        </ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem
          sx={{
            backgroundColor: 'rgb(255, 255, 255);',
            borderRadius: '20px',
            boxShadow: 'rgba(6, 5, 50, 0.12) 0px 4px 20px',
          }}
          key={item.img}>
          <Image
            width={157}
            height={146}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}>
                <Checkbox
                  {...label}
                  sx={{
                    color: orange[800],
                    '&.Mui-checked': {
                      color: orange[600],
                    },
                  }}
                />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    title: 'Сырный бортик',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    title: 'Сливочная моцарелла',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    title: 'Чеддер и пармезан',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/46889eeb335b4bf18d7a565f4fbc9588.png',
    title: 'Острый халапеньо',
    cols: 2,
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    title: 'Нежный цыпленок',
    cols: 2,
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    title: 'Шампиньоны',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
    title: 'Бекон',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    title: 'Ветчина',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    title: 'Острая чоризо',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    title: 'Маринованные огурчики',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    title: 'Свежие томаты',
  },
  {
    img: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    title: 'Красный лук',
    cols: 2,
  },
];
