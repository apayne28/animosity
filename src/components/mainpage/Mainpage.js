import HomepageContent from "./HomepageContent";
import NavigationBar from "./navBar/NavigationBar";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";
import fmab from "../../fmab.webp";
import berserk3 from "../../berserk.png";
import hxh from "../../hxh.webp";
import sg from "../../sg.jpg";
import op from "../../op.jpg";
import deathnote4 from "../../deathnote4.jpg";
import snk from "../../snk.jpg";
import cm from "../../cm.jpg";
import naruto from "../../naruto.jpg";
import opp from "../../opp.png";

const Mainpage = () => {
  return (
    // <div className='app-content'>
    <div className='mainpage-container'>
      {/* <div className='header-content'> */}
      <div>
        {/* <Header /> */}

        <NavigationBar />
      </div>
      <div className='homepage-carousel' data-testid="animosity-homepage-carousel">
        <Carousel>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='anime-info' state={{ animeId: 5114 }} data-testid={`animosity-banner-link-Full Metal Alchemist: Brotherhood`}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={fmab}
                    alt='Full Metal Alchemist: Brotherhood'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "9.3%",
                        // marginRight: "9.4%",
                        opacity: 0.8,
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ fontSize: 80 }}>
                        Full Metal Alchemist: Brotherhood
                      </Typography>
                    </Box>
                    {/* <Typography sx={{ fontSize: 80 }}></Typography> */}
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='anime-info' state={{ animeId: 11061 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={hxh}
                    alt='Hunter X Hunter (2011)'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "4%",
                        // marginRight: "4%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 80 }}>
                        Hunter X Hunter (2011)
                      </Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='anime-info' state={{ animeId: 9253 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={sg}
                    alt='Steins;Gate'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "8%",
                        // marginRight: "8%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 80 }}>Steins;Gate</Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='anime-info' state={{ animeId: 21 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={op}
                    alt='One Piece'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "8%",
                        // marginRight: "8%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 80 }}>One Piece</Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='anime-info' state={{ animeId: 1535 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={deathnote4}
                    alt='Death Note'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "8%",
                        // marginRight: "8%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 80 }}>Death Note</Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='manga-info' state={{ mangaId: 2 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={berserk3}
                    alt='Berserk'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    {/* <Typography sx={{ fontSize: 80 }}>Berserk</Typography> */}
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        marginLeft: "8%",
                        marginRight: "8%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 100 }}>Berserk</Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='manga-info' state={{ mangaId: 23390 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={snk}
                    alt='Shingeki no Kyojin'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    {/* <Typography sx={{ fontSize: 80 }}>Berserk</Typography> */}
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        marginLeft: "3.3%",
                        marginRight: "3.3%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 100 }}>
                        Shingeki no Kyojin
                      </Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='manga-info' state={{ mangaId: 116778 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={cm}
                    alt='Chainsaw Man'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    {/* <Typography sx={{ fontSize: 80 }}>Berserk</Typography> */}
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "3.3%",
                        // marginRight: "3.3%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 100 }}>
                        Chainsaw Man
                      </Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='manga-info' state={{ mangaId: 11 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={naruto}
                    alt='Naruto'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    {/* <Typography sx={{ fontSize: 80 }}>Berserk</Typography> */}
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "3.3%",
                        // marginRight: "3.3%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 100 }}>Naruto</Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>

          <Carousel.Item>
            <ImageList cols={1} rowHeight={1200}>
              <Link to='manga-info' state={{ mangaId: 4632 }}>
                <ImageListItem>
                  <Box
                    component='img'
                    src={opp}
                    alt='Oyasumi Punpun'
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      // margin: "auto",
                      display: "flex",
                    }}
                  />
                  <Carousel.Caption>
                    {/* <Typography sx={{ fontSize: 80 }}>Berserk</Typography> */}
                    <Box
                      sx={{
                        backgroundColor: "#3B2C35",
                        // marginLeft: "12.4%",
                        // marginRight: "12.4%",
                        opacity: 0.8,
                      }}
                    >
                      <Typography sx={{ fontSize: 100 }}>
                        Oyasumi Punpun
                      </Typography>
                    </Box>
                  </Carousel.Caption>
                </ImageListItem>
              </Link>
            </ImageList>
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <div>
          <HomepageContent />
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
