import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 200 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ color: '#666666', opacity: 0.55 }} fontSize="inherit" />}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
      {value !== null && (
        <Box
          sx={{
            ml: { xs: 0, sm: 2 },
            textAlign: 'center',
            mt: { xs: 2, sm: 0 },
          }}
        >
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
}