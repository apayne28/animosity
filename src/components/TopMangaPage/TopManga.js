import {
  Divider,
  Typography,
  Grid,
  Stack,
  Pagination,
  ImageList,
  ImageListItem,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopMangaBar from "./TopMangaBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const TopManga = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;
  let category = location.state.topFilter;

  const [topScoredManga, setTopScoredManga] = useState();
  const buttonCounter = buttonValue;
  const [lastPage, setLastPage] = useState();

  console.log(location);

  const getTopScoredManga = useCallback(async () => {
    try {
      //   const temp = await fetch(`https://api.jikan.moe/v4/top/anime`).then(
      //     (res) => res.json(),
      //   );
      // category = filter;
      const temp = await fetch(
        `${
          category !== " "
            ? `https://api.jikan.moe/v3/top/manga/${buttonCounter}/${category}`
            : `https://api.jikan.moe/v3/top/manga/${buttonCounter}`
        }`,
      ).then((res) => res.json());
      setLastPage(temp.last_page);

      let results = temp.top;
      console.log(temp);
      setTopScoredManga(results);
      return results;
    } catch (error) {
      console.log("Manga not found");
    }
  }, [buttonCounter, category]);

  useEffect(() => {
    if (!topScoredManga) {
      getTopScoredManga();
    }
  }, [getTopScoredManga, topScoredManga]);

  if (topScoredManga) {
    return (
      <div>
        <div className='header-content'>
          {/* <Header /> */}
          <NavigationBar />
        </div>

        <Divider />
        <Stack
          spacing={2}
          sx={{ display: "flex", alignItems: "center", marginTop: "8%" }}
        >
          <Pagination
            count={401}
            page={buttonCounter}
            onChange={(event, value) => {
              console.log(event, parseInt(event.target.innerText), value);
              // setButtonCounter(parseInt(e.target.innerText));
              navigate(`/top-manga`, {
                state: {
                  topFilter: category,
                  page: parseInt(value),
                },
              });
              // e.preventDefault();

              window.location.reload();
              window.scrollTo(0, 0);
            }}
          />
        </Stack>
        {/* <div className='top-anime-top-category-container'> */}
        <TopMangaBar />

        <div className='search-page-contents'>
          <div className='top-anime-top-category-title'>
            {/* <Typography>Top Anime</Typography> */}
          </div>
          <Grid container>
            <ImageList cols={6} rowHeight={980}>
              {topScoredManga.map((entry) => {
                // const entryInfo = getManga(entry.mal_id);
                // console.log(entryInfo);
                return (
                  //   console.log(entry);

                  <Box
                    // sx={{
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   // width: "70%",
                    //   margin: "auto",
                    //   backgroundColor: "white",
                    // }}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <ImageListItem>
                      <Card
                        className='search-page-card'
                        sx={{
                          // maxWidth: "90%",
                          paddingBottom: 41,
                          marginBottom: "5%",
                          margin: "4%",
                          // maxHeight: "100%",
                        }}
                      >
                        <CardHeader
                          title={`${entry.title} `}
                          subheader={
                            <Typography>{`${entry.type} (${
                              entry.volumes
                                ? `${entry.volumes} vols`
                                : `${
                                    entry.chapters
                                      ? `${entry.chapters} vols`
                                      : "? vols"
                                  }`
                            })`}</Typography>
                          }
                        />
                        <Link
                          to='/manga-info'
                          state={{ mangaId: entry.mal_id }}
                        >
                          {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}

                          <Box
                            className='search-page-list-entry-image'
                            component='img'
                            src={
                              topScoredManga
                                ? entry.image_url
                                : entry.images.jpg.image_url
                            }
                            alt={entry.title}
                            sx={{ width: "100%", height: "100%" }}
                          />
                        </Link>
                        <CardContent>
                          <Typography
                            sx={{ paddingBottom: "5%", fontSize: 30 }}
                          >{`Rank: ${entry.rank}`}</Typography>

                          <Typography
                            sx={{ fontSize: 20 }}
                          >{`${entry.members} fans`}</Typography>
                          <Typography>{`Score: ${entry.score}`}</Typography>
                        </CardContent>
                      </Card>
                    </ImageListItem>
                  </Box>
                );
              })}
            </ImageList>
          </Grid>

          <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={401}
              page={buttonCounter}
              onChange={(event, value) => {
                console.log(event, parseInt(event.target.innerText), value);
                // setButtonCounter(parseInt(e.target.innerText));
                navigate(`/top-manga`, {
                  state: {
                    topFilter: category,
                    page: parseInt(value),
                  },
                });
                // e.preventDefault();

                window.location.reload();
                window.scrollTo(0, 0);
              }}
            />
          </Stack>
        </div>
      </div>
      // <div className='top-anime-page-container'>
      //   <div className='header-content'>
      //     <Header />
      //     <NavigationBar />
      //   </div>
      //   <div className='top-anime-top-category-title'>
      //     <Typography>Top Anime</Typography>
      //     <TopMangaBar />
      //   </div>
      //   <Divider />
      //   <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      //     <Pagination
      //       count={401}
      //       page={buttonCounter}
      //       onChange={(event, value) => {
      //         console.log(event, parseInt(event.target.innerText), value);
      //         // setButtonCounter(parseInt(e.target.innerText));
      //         navigate(`/top-manga`, {
      //           state: {
      //             topFilter: category,
      //             page: parseInt(value),
      //           },
      //         });
      //         // e.preventDefault();

      //         window.location.reload();
      //         window.scrollTo(0, 0);
      //       }}
      //     />
      //   </Stack>
      //   <div className='top-anime-top-category-container'>
      //     <Grid>
      //       <ImageList cols={1} rowHeight={400}>
      //         {topScoredManga.map((entry) => {
      //           //   console.log(entry);
      //           return (
      //             <article className='top-anime-top-category-items'>
      //               <div className='top-anime-top-category-title-container'>
      //                 <figure>
      //                   <Typography className='top-anime-top-category-item-rank'>
      //                     {entry.rank}
      //                   </Typography>
      //                 </figure>
      //                 <figure>
      //                   <Link
      //                     to='/manga-info'
      //                     state={{ mangaId: entry.mal_id }}
      //                   >
      //                     {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}
      //                     <ImageListItem>
      //                       <img src={entry.image_url} alt={entry.title} />
      //                       <ImageListItemBar
      //                         title={entry.title}
      //                         subtitle={`${entry.start_date} - ${
      //                           entry.end_date === null
      //                             ? "Current"
      //                             : `${entry.end_date}`
      //                         }`}
      //                       />
      //                     </ImageListItem>
      //                   </Link>
      //                 </figure>
      //                 {/* <figure>
      //                   <Typography>{entry.title}</Typography>
      //                 </figure> */}
      //                 <figure>
      //                   <Typography>{`${entry.type} (${
      //                     entry.volumes
      //                       ? `${entry.volumes} vols`
      //                       : `${
      //                           entry.chapters
      //                             ? `${entry.chapters} vols`
      //                             : "N/A"
      //                         }`
      //                   })`}</Typography>
      //                   {/* <Typography>{entry.aired.string}</Typography> */}
      //                   {/* <Typography>{`${entry.start_date} - ${entry.end_date}`}</Typography> */}
      //                 </figure>
      //                 <figure>
      //                   {/* <Typography>{entry.aired.members}</Typography> */}
      //                   <Typography>{`${entry.members} fans`}</Typography>
      //                 </figure>
      //                 <figure>
      //                   <div className='top-anime-top-category-item-status'>
      //                     <Typography>{entry.status}</Typography>
      //                     <div className='top-anime-top-category-item-score'>
      //                       <Typography>{`Score: ${entry.score}`}</Typography>
      //                     </div>
      //                     {/* <div className='top-anime-top-category-item-status'>
      //                   <Typography>{entry.status}</Typography>
      //                 </div> */}
      //                   </div>
      //                 </figure>
      //               </div>
      //             </article>
      //           );
      //         })}
      //       </ImageList>
      //     </Grid>
      //     <div className='buttons'>
      //       <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      //         <Pagination
      //           count={401}
      //           page={buttonCounter}
      //           onChange={(event, value) => {
      //             console.log(event, parseInt(event.target.innerText), value);
      //             // setButtonCounter(parseInt(e.target.innerText));
      //             navigate(`/top-manga`, {
      //               state: {
      //                 topFilter: category,
      //                 page: parseInt(value),
      //               },
      //             });
      //             // e.preventDefault();

      //             window.location.reload();
      //             window.scrollTo(0, 0);
      //           }}
      //         />
      //       </Stack>
      //     </div>
      //   </div>

      //   <Typography>Hi</Typography>
      // </div>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default TopManga;
