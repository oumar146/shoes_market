import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color: 'white', 
    backgroundColor: 'black'
  },
}));


export default function HeaderBadge(props) {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={props.number} color="primary">
        {props.children}
      </StyledBadge>
    </IconButton>
  );
}


