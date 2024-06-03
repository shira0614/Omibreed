import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../index.css'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { useNavigate } from "react-router-dom";
import AcceptDialog from "./AcceptDialogue.jsx";
import RejectDialog from "./RejectDialogue.jsx";
import CompleteDialogue from "./CompleteDialogue.jsx";
import { useState } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export function HomeAnalysisCard(props) {
    const [expanded, setExpanded] = useState(false);
    const [openUpload, setOpenUpload] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleOpenUpload = () => { setOpenUpload(true) }
    return (
        <>
            { /* qui il component CompleteDialogue */ }
                <Card sx={{
                    display: 'flex',
                    border: '3px solid',
                    borderColor: '#ffffff00',
                    m: '1rem',
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant='h5' gutterBottom >
                                    {props.replica.replicaUniqueId}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {props.shipper.username}
                                </Typography>
                                <Typography variant="body2">
                                    Status: {props.status}
                                </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleOpenUpload} sx={{ color: '#2E644A' }}>Compila</Button>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant='h6' display='block'>Dettagli</Typography>
                                <Typography variant='h7'>Pianta madre: {props.replica.treeId.treeUniqueId}</Typography>
                                &nbsp;
                                <Typography variant='body2' color="text.secondary" display='inline'>{props.replica.treeId.sottospecie}, {props.replica.treeId.cultivar}</Typography>
                                <Typography variant='h7' display='block'>Inoculazione: {props.replica.treeId.inoculated? 'Si' : 'No'}</Typography>
                                <Typography variant='h7' display='block'>Infezione: {props.replica.treeId.infectionType}</Typography>
                                <Typography variant='h7'>Note: </Typography>
                                <Typography variant='body1'>{props.notes ? props.notes : 'Nessuna'}</Typography>
                            </CardContent>
                        </Collapse>
                    </Box>
                        {
                            props.image ? <CardMedia
                                component="img"
                                alt="plant image"
                                height="140"
                                image = {props.image}
                            /> : <Box className='leaf-mini' sx={{
                                minWidth: '10vw', minHeight: '100%', ml: 4
                            }}/>
                        }
                </Card>
        </>
    );
}

export function NewAnalysisCard(props) {
    const [ openAccept, setOpenAccept ] = useState(false)
    const [ openReject, setOpenReject] = useState(false)

    const handleOpenAccept = () => {setOpenAccept(true)}
    const handleOpenReject = () => {setOpenReject(true)}

    return (
        <>
        <AcceptDialog setOpen={setOpenAccept} isOpen={openAccept} id={props._id}/>
        <RejectDialog setOpen={setOpenReject} isOpen={openReject} id={props._id}/>
            <Card sx={{
                display: 'flex',
                border: '3px solid',
                borderColor: '#ffffff00',
                m: '1rem',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        {props.shipper.username}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Status: {props.status}
                    </Typography>
                    <Typography variant='h6'>Dettagli</Typography>
                    <Typography variant='h7'>Pianta madre: {props.replica.treeId.treeUniqueId}</Typography>
                    &nbsp;
                    <Typography variant='body2' color="text.secondary" display='inline'>{props.replica.treeId.sottospecie}, {props.replica.treeId.cultivar}</Typography>
                    <Typography variant='h7' display='block'>Inoculazione: {props.replica.treeId.inoculated? 'Si' : 'No'}</Typography>
                    <Typography variant='h7' display='block'>Infezione: {props.replica.treeId.infectionType}</Typography>
                    <Typography variant='h7'>Note: </Typography>
                    <Typography variant='body1'>{props.notes ? props.notes : 'Nessuna'}</Typography>
                </CardContent>
                <CardActions>
                    <Button sx={{ color: '#2E644A'}} onClick={handleOpenAccept}>Accetta</Button>
                    <Button sx={{ color: '#d32727'}} onClick={handleOpenReject}>Rifiuta</Button>
                </CardActions>
                </Box>
                {
                    props.image ? <CardMedia
                        component="img"
                        alt="plant image"
                        height="140"
                        image = {props.image}
                    /> : <Box className='leaf-mini' sx={{
                        minWidth: '10vw', minHeight: '100%', ml: 4
                    }}/>
                }
            </Card>
        </>
    );
}

export function ColtAnalysisCard(props) {
    return (
        <Card sx={{
            display: 'flex',
            border: '3px solid',
            borderColor: '#ffffff00',
            m: '1rem',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.analysis.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        Destinatario: {props.analysis.laboratory.username}
                    </Typography>
                    <Typography variant='h6'>
                        Status:
                    </Typography>
                    <Typography>
                        {props.analysis.status === 'shipped' ? "L'analisi è in attesa di riscontro da parte del laboratorio"
                        : props.analysis.status === 'accepted' ? "L'analisi è stata accettata dal laboratorio"
                                :"L'analisi è stata rifiutata dal laboratorio"}
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>Dettagli analisi</Typography>
                    <Typography fontWeight='bold'>Note:
                        <Typography variant='body1'>{props.analysis.notes ? props.analysis.notes : 'Nessuna'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Documenti:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.document ? props.analysis.document : 'Nessuno'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Campioni:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.replica.sample}</Typography>
                    </Typography>
                </CardContent>
            </Box>
            {
                props.image ? <CardMedia
                    component="img"
                    alt="plant image"
                    height="140"
                    image = {props.image}
                /> : <Box className='leaf-mini' sx={{
                    minWidth: '10vw', minHeight: '100%', ml: 4
                }}/>
            }
        </Card>
    )
}

export function CompletedAnalysis(props) {
    return (
        <Card sx={{
            display: 'flex',
            border: '3px solid',
            borderColor: '#ffffff00',
            m: '1rem',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant='h5' gutterBottom>
                        {props.analysis.replica.replicaUniqueId}
                    </Typography>
                    <Typography variant="body1">
                        Mittente: {props.analysis.laboratory.username}
                    </Typography>
                    <Typography variant='h6'>
                        Status:
                    </Typography>
                    <Typography>
                       L'analisi è stata completata
                    </Typography>
                    &nbsp;
                    <Typography variant='h6'>Dettagli analisi</Typography>
                    <Typography fontWeight='bold'>Note:
                        <Typography variant='body1'>{props.analysis.notes ? props.analysis.notes : 'Nessuna'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Documenti:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.document ? props.analysis.document : 'Nessuno'}</Typography>
                    </Typography>
                    <Typography fontWeight='bold'>Campioni:
                        &nbsp;
                        <Typography variant='body1' display='inline'>{props.analysis.replica.sample}</Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='forest'>
                        <GetAppRoundedIcon sx={{ mr: 1 }}/> Scarica analisi
                    </Button>
                </CardActions>
            </Box>
            {
                props.image ? <CardMedia
                    component="img"
                    alt="plant image"
                    height="140"
                    image = {props.image}
                /> : <Box className='leaf-mini' sx={{
                    minWidth: '10vw', minHeight: '100%', ml: 4
                }}/>
            }
        </Card>
    )
}