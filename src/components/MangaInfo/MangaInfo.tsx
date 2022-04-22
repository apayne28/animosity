import React from "react";
import { Box, Divider, Grid, Link, ListItem, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import MangaInfoMangaDetails from "./MangaInfoMangaDetails";

interface Props {
  mangaId: number;
  // character?: string
  // staff?:string
  // episodes?:string
  // news?:string
  // forum?:string
  // videos?:string
  // pictures?:string
  // statistics?:string
  // moreinfo?:string
  // recommendations?:string
  // userupdates?:string
  // reviews?:string
  // relations?:string
  // themes?:string
  // external?:string
  mangaRequest?: string;
  mangaParameters?: any;
}

interface MangaCharacter extends Object {
  character: Object;
  mal_id: number;
  images: Object;
  name: string;
  url: string;
}

const MangaInfo = (props: Props) => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const jikanjsV4 = require("@mateoaranda/jikanjs");
  const { mangaId, mangaRequest, mangaParameters } = props;

  const [info, setInfo] = useState();
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();
  const [mangaRelations, setMangaRelations] = useState();
  const [singleMangaRelations, setSingleMangaRelations] = useState();

  const [mangaCharacterList, setMangaCharacterList] = useState();

  const [externalLinks, setExternalLinks] = useState();

  const GetManga = useCallback(async (id) => {
    // const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}`).then(
    //   (res) => res.json(),
    // );

    let res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
    let data = await res.json();
    if (res.status !== 200) return Promise.reject(new Error(data.error));
    console.log("Manga Data", data.data);
    setInfo(data.data);
    return Promise.resolve(data);
    // console.log(temp.data);
    // setInfo(temp.data);
    // return temp.data;
  }, []);

  const GetExternalMangaLinks = useCallback(async (id) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/manga/${id}/external`,
    ).then((res) => res.json());

    setExternalLinks(temp.data);
    return temp.data;
  }, []);

  const GetRelatedManga = useCallback(async (id) => {
    let res = await fetch(`https://api.jikan.moe/v4/manga/${id}/relations`);
    let data = await res.json();
    if (res.status !== 200) return Promise.reject(new Error(data.error));
    //   console.log("RelatedAnime", data.data);
    setMangaRelations(data.data);
    return Promise.resolve(data);
  }, []);

  const GetMangaCharacters = useCallback(async (id) => {
    let res = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
    let temp = await res.json();
    if (res.status !== 200) return Promise.reject(new Error(temp.error));
    console.log(temp.data);
    setMangaCharacterList(temp.data);

    return Promise.resolve(temp);
  }, []);

  const GetMangaRecs = useCallback(async (id) => {
    let res = await fetch(
      `https://api.jikan.moe/v4/manga/${id}/recommendations`,
    );
    let temp = await res.json();
    if (res.status !== 200) return Promise.reject(new Error(temp.error));
    console.log("Recs", temp.data);
    setMangaRecommendationsList(temp.data);

    return Promise.resolve(temp);
  }, []);

  useEffect(() => {
    if (!info) {
      GetManga(75989).catch(console.error);
    }
    GetExternalMangaLinks(75989).catch(console.error);
    if (!mangaRelations) {
      GetRelatedManga(75989).catch(console.error);
    }
    if (!mangaCharacterList) {
      GetMangaCharacters(75989).catch(console.error);
    }
    if (!mangaRecommendationsList) {
      GetMangaRecs(75989).catch(console.error);
    }
  }, [
    GetExternalMangaLinks,
    GetManga,
    GetMangaCharacters,
    GetMangaRecs,
    GetRelatedManga,
    info,
    mangaCharacterList,
    mangaRecommendationsList,
    mangaRelations,
  ]);

  if (
    info &&
    mangaRelations &&
    mangaCharacterList &&
    mangaRecommendationsList
  ) {
    return (
      <Box className='anime-info-container'>
        <div className='header-content'>
          <Header />

          <NavigationBar />
        </div>
        <div className='anime-info-main'>
          <Box className='anime-info-side-content'>
            <Typography className='anime-info-title-header'>
              {info.title}
            </Typography>
            <img src={info.images.jpg.image_url} alt={info.title} />
            <div className='anime-info-alternative-titles-container'>
              <h3>Alternate Titles:</h3>
              {info.title_english && (
                <Typography className='anime-info-alternative-english'>
                  {`English: ${info.title_english}`}
                </Typography>
              )}
              {info.title_japanese && (
                <Typography className='anime-info-alternative-japanese'>
                  {`Japanese: ${info.title_japanese}`}
                </Typography>
              )}
              {info.title_synonyms && (
                <div>
                  <h3>Synonyms</h3>
                  {info.title_synonyms.map((altTitles) => (
                    <div className='anime-info-title-synonyms'>{altTitles}</div>
                  ))}
                </div>
              )}
            </div>
            <div className='anime-info-information'>
              <h3>Information</h3>
              <Typography>{`Type: ${info.type}`}</Typography>
              <Typography>{`Volumes: ${info.volumes}`}</Typography>
              <Typography>{`Chapters: ${info.chapters}`}</Typography>

              <Typography>{`Status: ${info.status}`}</Typography>
              <Typography>{`Published: ${info.published.string}`}</Typography>
              <Typography>{`Genres: ${info.genres.map((genres) =>
                genres ? ` ${genres.name} ` : "N/A",
              )}`}</Typography>
              <Typography>{`Theme: ${info.themes.map((themes) =>
                themes ? ` ${themes.name} ` : "N/A",
              )}`}</Typography>
              <Typography>{`Demographics: ${info.demographics.map(
                (demographics) =>
                  demographics ? ` ${demographics.name} ` : "N/A",
              )}`}</Typography>
              <Typography>{`Serializations: ${info.serializations.map(
                (serialization) =>
                  serialization ? ` ${serialization.name} ` : "N/A",
              )}`}</Typography>
              <Typography>{`Author(s): ${info.authors.map((authors) =>
                authors ? ` ${authors.name} ` : "N/A",
              )}`}</Typography>
            </div>
            <div className='anime-info-statistics'>
              <h3>Statistics</h3>
              <Typography>{`Score: ${info.score}`}</Typography>
              <Typography>{`Ranked: ${info.rank}`}</Typography>
              <Typography>{`Popularity: ${info.popularity}`}</Typography>
              <Typography>{`Members: ${info.members}`}</Typography>
              <Typography>{`Favorites: ${info.favorites}`}</Typography>
            </div>
          </Box>
          <div className='anime-info-content-guts'>
            <MangaInfoMangaDetails />
            <div className='anime-info-main-popularity-container'>
              <h3>Synopsis</h3>
              <Typography>{info.synopsis}</Typography>
              <Divider sx={{ pb: 4 }} />
              <h3>Background</h3>
              <Typography>{info.background}</Typography>
              <Divider sx={{ pb: 4 }} />

              <h3>Related Manga</h3>
              <div className='anime-info-related-anime-container'>
                {mangaRelations.map((info: any) => {
                  let relatedManga = info.entry;
                  let relatedMangaType = info.relation;

                  return relatedManga.map((single) => {
                    return (
                      <Typography className='anime-info-related-anime-item'>{`${relatedMangaType}: ${single.name}`}</Typography>
                    );
                  });
                })}
              </div>

              <Divider sx={{ pb: 4 }} />

              <h3>Characters</h3>
              <div className='anime-info-character-list'>
                {mangaCharacterList.slice(0, 5).map((character: any) => {
                  let characterEntry: any = character.character;
                  // console.log(characterEntry);

                  return (
                    <Grid item>
                      <img
                        src={characterEntry.images.jpg.image_url}
                        alt={characterEntry.name}
                      />
                      <div>{characterEntry.name} </div>
                    </Grid>
                  );
                })}
              </div>

              <Divider sx={{ pb: 4 }} />
              <h3>Recommended Manga</h3>
              <div className='anime-info-rec-anime-container'>
                {mangaRecommendationsList.slice(0, 5).map((info: any) => {
                  let recManga = info.entry;

                  return (
                    <div className='anime-info-rec-anime-item'>
                      <img
                        src={recManga.images.jpg.image_url}
                        alt={recManga.title}
                      />
                      <Typography>{recManga.title}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MangaInfo;
