import React, {useState, useEffect} from 'react';
import { getAlbums, addAlbum, updateAlbum, deleteAlbum} from './requests';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Modal,
    TextField
} from '@mui/material';

const Album = () => {

    const [albums, setAlbums] = useState([]);
    const [userId, setUserId] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    useEffect(() => {
        getAlbums().then((response) => {
          setAlbums(response.data);
        });
    }, []);

    const handleAddAlbum = () => {
        addAlbum({"userId":userId, "id":id, "title":title}).then((response) => {
            setAlbums([...albums, response.data]);
            setOpen(false);
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedAlbum(null);
        setOpen(false);
    };

        const handleEditAlbum = (album) => {
            setSelectedAlbum(album);
            setUserId(album.userId);
            setId(album.id);
            setTitle(album.title);
            setOpen(true);
        };

        const handleUpdateAlbum = () => {
            updateAlbum({"userId":userId, "id":id, "title":title}).then((response) => {
                const updatedAlbums = albums.map((album) => {
                    if (album.id === response.data.id) {
                        return response.data;
                    } else {
                        return album;
                    }
                });
                setAlbums(updatedAlbums);
                setSelectedAlbum(null);
                setOpen(false);
            });
        };

        const handleDeleteAlbum = (id) => {
            deleteAlbum(id).then(() => {
                const updatedAlbums = albums.filter((album) => album.id !== id);
                setAlbums(updatedAlbums);
            });
        };

        return (
            <Box>
                <Grid container spacing={2} sx={{backgroundColor: 'black', padding: 2}}>
                    {albums.map((album) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
                            <Card
                                sx={{
                                    backgroundColor: 'white',
                                    height: '100%', // reduce the height of the card
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)', // add a box-shadow to the card
                                    borderRadius: '10px', // round off the edges of the card
                                    cursor: 'pointer' // add cursor pointer to the card
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            color: 'black',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        {album.title}
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        color="text.secondary"
                                    >
                                        User ID: {album.userId}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    >
                                        Album ID: {album.id}
                                    </Typography>
                                    <Typography variant="body2">{album.body}</Typography>
                                    <Button variant="contained" onClick={() => handleEditAlbum(album)} sx={{mr: 2}}>Edit</Button>
                                    <Button variant="contained" onClick={() => handleDeleteAlbum(album.id)}>Delete</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                    <Button variant="contained" onClick={handleOpen}>Add Album</Button>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedAlbum ? 'Edit Album' : 'Add Album'} {/* change modal title based on whether an album is selected or not */}
                        </Typography>
                        <TextField
                            label="User ID"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <TextField
                            label="Album ID"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={id}
                            disabled={selectedAlbum ? true : false} // disable the field if an album is selected
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button variant="contained" onClick={selectedAlbum ? handleUpdateAlbum : handleAddAlbum}>{selectedAlbum ? 'Update Album' : 'Add Album'}</Button> {/* change button text based on whether an album is selected or not */}
                    </Box>
                </Modal>
            </Box>
        );
    };
    export default Album;

