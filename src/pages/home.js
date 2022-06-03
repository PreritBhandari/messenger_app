import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CircularProgress, Box, } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '../api/api';
import messengerbox from '../assets/messengerbox.png'
import chandlerimage from '../assets/chandler.jpeg'
import joeyimage from '../assets/joey.jpg'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {

    const [isLoaded, setLoaded] = useState(false)
    const [allData, setAllData] = useState([])
    const [page, setPage] = useState(1)


    const getNextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        async function getData() {
            await api.get(`/public/v1/users?page=${page}`)
                .then((res) => {
                    // Sorting in Descending order for ids
                    setAllData(allData.concat(res.data.data.sort((a, b) => b.id - a.id)))
                    setLoaded(true)
                })

                .catch((error) => {
                    console.log(error)
                })
        }
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    window.onbeforeunload = function () {
        window.scrollTo(700, 700);
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return isLoaded ? (
        <div>
            <Box sx={{
                display: "flex", boxShadow: 1,
                justifyContent: "space-between",
                position: "fixed", backgroundColor: "white",
                top: 0, zIndex: 100, width: "99%", padding: 2,
            }}>
                <div style={{ display: "flex", width: "94%" }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Prerit Bhandari" src={chandlerimage} sx={{ width: 50, height: 50 }} />
                    </StyledBadge>
                    <span style={{ margin: 15 }}>Prerit Bhandari</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", width: "6%", margin: 10 }}>
                    <CallIcon color='primary' />
                    <VideocamIcon color='primary' />
                    <MoreHorizIcon color='primary' />
                </div>
            </Box>
            <List sx={{ width: '100%', marginTop: 10, bgcolor: 'background.paper' }}>
                <div
                    id="scrollableDiv"
                    style={{
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                    }}
                >
                    <InfiniteScroll
                        dataLength={allData.length}
                        next={getNextPage}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        inverse={true} //
                        hasMore={true}
                        height={770}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        {allData.map((item, index) =>
                            <div>
                                <ListItem key={index} alignItems="flex-start">
                                    {item.id % 2 === 0 ?
                                        <ListItemAvatar>
                                            <Avatar alt="Profile pic" src={joeyimage} sx={{ width: 35, height: 35, border: "1px solid silver", }} />
                                        </ListItemAvatar>
                                        : null}
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {item.id % 2 === 0 ?
                                                    <>
                                                        <Typography
                                                            sx={{ display: "inline-block", backgroundColor: "silver", padding: 1.5, borderRadius: 10 }}
                                                            component="div"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {item.name}
                                                        </Typography>

                                                        <br />
                                                    </>
                                                    : null}

                                                {item.id % 2 !== 0 ?
                                                    <Typography
                                                        sx={{ display: "inline-block", float: "right", backgroundColor: "rgb(0, 132, 255)", color: "white", padding: 1.5, borderRadius: 10 }}
                                                        component="div"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {item.name}

                                                    </Typography>
                                                    : null}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </div>
                        )}

                    </InfiniteScroll>
                </div>
                <img style={{ width: "100%", position: "sticky", bottom: 0, zIndex: 100 }} alt="messengerbox" src={messengerbox} />
            </List>
        </div>
    ) : <CircularProgress sx={{ margin: "20%" }} size={70} />
}