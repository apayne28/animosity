import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Carousel from "react-elastic-carousel";
import { Box } from "@mui/system";
import LoadingScreen from "../LoadingScreen";

const HomepageContent = () => {

  const [springAnime, setSpringAnime] = useState([]);
  const [summerAnime, setSummerAnime] = useState([]);
  const [recentPromos, setRecentPromos] = useState([]);
  const [popularPromos, setPopularPromos] = useState([]);




  const getCurrentSeason = () => {
    // It's plus one because January is index 0
    const now = new Date();
    const month = now.getMonth() + 1;
  
    if (month > 3 && month < 6) {
      return 'spring';
    }
  
    if (month > 6 && month < 9) {
      return 'summer';
    }
  
    if (month > 9 && month < 12) {
      return 'fall';
    }
  
    if (month >= 1 && month < 3) {
      return 'winter';
    }
  
    const day = now.getDate();
    if (month === 3) {
      return day < 22 ? 'winter' : 'spring';
    }
  
    if (month === 6) {
      return day < 22 ? 'spring' : 'summer';
    }
  
    if (month === 9) {
      return day < 22 ? 'summer' : 'fall';
    }
  
    if (month === 12) {
      return day < 22 ? 'fall' : 'winter';
    }
  
    console.error('Unable to calculate current season');
  }

 
  

  const d = new Date()

  let currentYear = d.getFullYear()
  let currentSeason = getCurrentSeason()

  const getNextSeason = () => {
    let nextSeason = ''
 
    if (currentSeason === 'fall') {
      nextSeason = 'winter'
    }
    else if (currentSeason === 'winter') {
      nextSeason = 'spring'
    }
    else   if (currentSeason === 'spring') {
      nextSeason = 'summer'
    }
    else   if (currentSeason === 'summer') {
      nextSeason = 'fall'
    }
    return nextSeason
  }

  const nextAnimeSeason = getNextSeason(currentSeason)

  console.log(getCurrentSeason(), getNextSeason('winter'))


  const GetCurrentSeasonAnime = async () => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/seasons/${currentYear}/${currentSeason}`,

      ).then((res) => res.json());

      setSpringAnime(temp.data);
    } catch (error) {
      console.log("Spring Anime list not found");
    }
  };

  const GetUpcomingAnime = async () => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/seasons/${currentYear}/${nextAnimeSeason}`,
     
      ).then((res) => res.json());


      setSummerAnime(temp.data);
    } catch (error) {
      console.log("Summer Anime not found");
    }
  };

 

 

  const GetRecentPromos = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const temp = await fetch(`https://api.jikan.moe/v4/watch/promos`).then(
        (res) => res.json(),
      );

      setRecentPromos(temp.data);
    } catch (error) {
      console.log("Recent Promos not found");
    }
  };

  const GetPopularPromos = async () => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/watch/promos/popular`,
      ).then((res) => res.json());

      setPopularPromos(temp.data);
    } catch (error) {
      console.log("Popular Promos not found");
    }
  };

  // const openNewPage = (url) => {
  //   let newPage = window.open(url, "noopener,noreferrer");
  // }

  useEffect(() => {

    if(springAnime.length ===0 && summerAnime.length === 0 && recentPromos.length === 0 && popularPromos.length === 0) {
      GetCurrentSeasonAnime()
      GetUpcomingAnime()
      GetRecentPromos()
      GetPopularPromos()
      
      
    }
  }, [popularPromos, recentPromos, springAnime, summerAnime]);



  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  const promoBreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 2, itemsToScroll: 2 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  // console.log(window.innerWidth);

  if (springAnime && summerAnime && recentPromos && popularPromos) {
    return (
      <div className='homepage-content'>
        <div className='homepage-header-content'>
          <Typography variant='h3' sx={{ marginBottom: "2%" }} data-testid={`spring-anime-${currentYear}-header`}>
            {`${currentSeason[0].toLocaleUpperCase()+ currentSeason.substring(1)} ${currentYear} Anime`}
          </Typography>
          <Link to='/top-anime' state={{ animeList: springAnime }}>
            <Typography
              sx={{
                fontSize: 29,
              }}
            >
              View More
            </Typography>
          </Link>
        </div>
        <Box sx={{ paddingBottom: "3%" }} data-testid="spring-anime-carousel">
          <Carousel
            breakPoints={breakPoints}
          
          >
            {springAnime.map((anime, aniKey) => {
              return (
                // <Grid item className='individual-featured-anime-container'>
                <div key={aniKey} style={{ width: "95%" }}>
                  <ImageList cols={1} rowHeight={500}>
                    <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                      <ImageListItem key={anime.id}>
                        <Box
                          component='img'
                          className='featured-anime-image'
                          src={anime.images.jpg.image_url}
                          alt={anime.title}
                          sx={{ width: "100%", height: "100%" }}
                        />
                        <ImageListItemBar title={anime.title} />
                      </ImageListItem>
                      {/* <div className='featured-anime-text'>{anime.title}</div> */}
                    </Link>
                  </ImageList>
                </div>
                // </Grid>
              );
            })}
          </Carousel>
        </Box>

        <div className='homepage-header-content'>
         
          <Typography variant='h3' sx={{ marginBottom: "2%" }} data-testid={`summer-anime-${currentYear}-header`}>
          {`${nextAnimeSeason[0].toLocaleUpperCase()+ nextAnimeSeason.substring(1)} ${currentYear} Anime`}
          </Typography>
          <Link to='/top-anime' state={{ animeList: summerAnime }}>
            <Typography
              sx={{
                fontSize: 29,
              }}
            >
              View More
            </Typography>
          </Link>
        </div>
        <Box sx={{ paddingBottom: "3%" }} data-testid='summer-anime-carousel'>
          <Carousel
            breakPoints={breakPoints}
            
          >
            {summerAnime.map((anime, aniKey) => {
              return (
                // <Grid item className='individual-featured-anime-container'>
                <div key={aniKey} style={{ width: "95%" }}>
                  <ImageList cols={1} rowHeight={500}>
                    <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                      <ImageListItem key={anime.id} cols={1} rows={1}>
                        <img
                          className='featured-anime-image'
                          src={anime.images.jpg.image_url}
                          alt={anime.title}
                          sx={{ width: "100%", height: "100%" }}
                        />
                        <ImageListItemBar title={anime.title} />
                      </ImageListItem>
                      {/* <div className='featured-anime-text'>{anime.title}</div> */}
                    </Link>
                  </ImageList>
                </div>
                // </Grid>
              );
            })}
          </Carousel>
        </Box>

        <Typography variant='h3' sx={{ marginBottom: "2%" }} data-testid='recent-promos-header'>
          Watch Recent Promos
        </Typography>
        <Box sx={{ paddingBottom: "3%" }} data-testid='recent-promos-carousel'>
          <Carousel
            breakPoints={promoBreakPoints}
       
          >
            {recentPromos.map((anime, aniKey) => {
              return (
                <div key={aniKey} s>
                  <ImageList cols={1} rowHeight={400}>
                    <ImageListItem>
                      <ReactPlayer url={anime.trailer.url} />
                      <ImageListItemBar
                        title={<a href={anime.trailer.url} data-testid={`recent-promos-link-${anime.entry.title}`} style={{textDecoration: 'none', color:'#ffffff'}}>{anime.entry.title}</a>}
                        subtitle={anime.title}
                      />
                    </ImageListItem>
                  </ImageList>
                </div>
              );
            })}
          </Carousel>
        </Box>

        <Typography variant='h3' sx={{ marginBottom: "2%" }} data-testid='popular-promos-header'>
          Watch Popular Promos
        </Typography>
        <Box sx={{ paddingBottom: "3%" }} data-testid='popular-promos-carousel'>
          <Carousel
            breakPoints={promoBreakPoints}
            
          >
            {popularPromos.map((anime, aniKey) => {
              return (
                <div key={aniKey}>
                  <ImageList cols={1} rowHeight={420}>
                    <ImageListItem>
                      <ReactPlayer url={anime.trailer.url} />
                      <ImageListItemBar
                        title={<a href={anime.trailer.url} data-testid={`popular-promos-link-${anime.entry.title}`} style={{textDecoration: 'none', color:'#ffffff'}}>{anime.entry.title}</a>}
                        subtitle={anime.title}
                      />
                    </ImageListItem>
                  </ImageList>
                </div>
              );
            })}
          </Carousel>
        </Box>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default HomepageContent;
