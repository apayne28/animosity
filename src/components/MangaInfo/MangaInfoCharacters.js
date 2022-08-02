import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Carousel from "react-elastic-carousel";

function MangaInfoCharacters(props) {
  const [mangaCharacterList, setMangaCharacterList] = useState();

  const getMangaCharacters = useCallback(async (id) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      let mangaCharactersData = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/characters`,
      ).then((res) => res.json());
      let mangaCharactersDataResults = mangaCharactersData.data;

      setMangaCharacterList(mangaCharactersDataResults);
    } catch (error) {
      console.log("Manga Character List not found");
    }
  }, []);

  useEffect(() => {
    if (!mangaCharacterList) {
      getMangaCharacters(props.mangaId);
    }
  }, [getMangaCharacters, mangaCharacterList, props.mangaId]);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];

  console.log(props.mangaId);
  if (mangaCharacterList && mangaCharacterList.length > 1) {
    return (
      <Box data-testid="animosity-anime-page-character-section">
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
            to='/manga-character-list-page'
            state={{ mangaId: props.mangaId }}
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
              View More
            </Typography>
          </Link>
        </Box>

        <div className='anime-info-character-list' data-testid="animosity-anime-page-character-section-carousel">
          <Carousel breakPoints={breakPoints}>
            {mangaCharacterList.length > 0
              ? mangaCharacterList.map((character) => {
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
                })
              : "N/A"}
          </Carousel>
        </div>
      </Box>
    );
  } else if (mangaCharacterList && mangaCharacterList.length === 0) {
    return <div></div>;
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoCharacters;
