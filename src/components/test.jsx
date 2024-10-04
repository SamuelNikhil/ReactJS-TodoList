import React from 'react';
import { Dialog, DialogContent, Box, IconButton, Stack, Typography, DialogTitle, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BsDownload } from 'react-icons/bs';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'; // Import DocViewer

type PreviewModalProps = {
  open: boolean;
  handleClose: () => void;
  images: Array<{ id: number; img: string; name: string }>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  docsource?: string; // Document source (URL)
};

const PreviewModal: React.FC<PreviewModalProps> = ({
  open,
  handleClose,
  images,
  currentIndex,
  setCurrentIndex,
  docsource,
}) => {
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to next image
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Go to previous image
    }
  };

  const image = images[currentIndex]; // Safely access the current image

  // Create an array of documents for DocViewer
  const docs = docsource
    ? [{ uri: docsource }] // If docsource is provided, use it
    : images.map((img) => ({ uri: img.img })); // Else map image URLs

  const renderContent = () => {
    if (docsource) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          position="relative"
          sx={{ height: '85vh', width: '90vw' }}
        >
          {/* Use DocViewer to preview the document */}
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ width: '100%', height: '100%' }} />
        </Box>
      );
    } else {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          position="relative"
          border={'1px solid #ffffff8f'}
          borderRadius={'10px'}
          sx={{ height: '85vh', width: '90vw' }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#FFF' }}
            disabled={currentIndex === 0}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {image ? (
            <Box
              component="img"
              src={image.img}
              alt={image.name}
              style={{
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          ) : (
            <Typography color="#FFF">No image available</Typography>
          )}

          <IconButton
            onClick={handleNext}
            sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#FFF' }}
            disabled={currentIndex === images.length - 1}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullScreen
      sx={{
        borderRadius: '0 !important',
        background: 'transparent',
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogTitle sx={{ background: '#000' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Typography color="#fff">
            {docsource ? 'Document Preview' : image?.name || 'Image Preview'}
          </Typography>
          <Box display="flex" justifyContent="end" alignItems="center">
            {/* Only show download button if there's no docsource */}
            {!docsource && (
              <Tooltip title="Download">
                <IconButton>
                  <BsDownload color="#fff" fontSize={'16px'} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: '#FFF', fontSize: '16px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ background: '#000', display: 'flex', justifyContent: 'center' }}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;