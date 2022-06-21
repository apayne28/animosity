import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";
import Carousel from "react-elastic-carousel";

function AnimeInfoCharacters(props) {
  const [animeCharacterList, setAnimeCharacterList] = useState();

  // let navigate = useNavigate();
  console.log(props.animeId);
  const getAnimeCharacters = useCallback(async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    let animeCharactersData = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`,
    ).then((res) => res.json());
    let animeCharactersDataResults = animeCharactersData.data;
    console.log("Chatacters", animeCharactersDataResults);
    setAnimeCharacterList(animeCharactersDataResults);
  }, []);
  useEffect(() => {
    if (!animeCharacterList) {
      getAnimeCharacters(props.animeId);
    }
  }, [animeCharacterList, getAnimeCharacters, props.animeId]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  if (animeCharacterList && animeCharacterList.length > 1) {
    return (
      <Box>
        <Box
          sx={{
            backgroundColor: "#56e39f",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "2.5%",
          }}
        >
          <h3>Characters</h3>
          <Link
            to='/anime-character-list-page'
            state={{ animeId: props.animeId }}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                // padding: "0.5%",
                fontSize: 29,
                // display: "flex",
                // justifyContent: "flex-end",
                marginTop: "17%",
                // marginRight: "1%",
              }}
            >
              {/* <Typography sx={{ padding: "0.5%", fontSize: 19, display: 'flex' }}> */}
              View More
            </Typography>
          </Link>
        </Box>

        <Box sx={{ paddingLeft: "2%", paddingRight: "2%" }}></Box>

        <div className='anime-info-character-list'>
          <Carousel breakPoints={breakPoints}>
            {animeCharacterList.map((character) => {
              let characterEntry = character.character;
              // console.log(characterEntry);

              return (
                <div>
                  <ImageList cols={1} rowHeight={400}>
                    <Link
                      to='/character-profile'
                      state={{ characterId: characterEntry.mal_id }}
                    >
                      <ImageListItem>
                        <Box
                          component='img'
                          src={characterEntry.images.jpg.image_url}
                          alt={characterEntry.name}
                          // sx={{ borderRadius: 1 }}
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 1,
                          }}
                        />
                        <ImageListItemBar
                          title={characterEntry.name}
                          sx={{ borderRadius: 1 }}
                        />
                      </ImageListItem>
                      {/* <Typography>{characterEntry.name} </Typography> */}
                    </Link>
                  </ImageList>
                </div>
              );
            })}
          </Carousel>
        </div>
      </Box>
    );
  } else if (animeCharacterList && animeCharacterList.length === 0) {
    return <div></div>;
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeInfoCharacters;
