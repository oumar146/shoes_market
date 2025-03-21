import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    color: 'white', 
    backgroundColor: 'black'
  },
}));


export default function HeaderBadge(props) {
  return (
    <IconButton aria-label="cart" className="p-0 m-0">
      <StyledBadge badgeContent={props.number} color="primary">
        {props.children}
      </StyledBadge>
    </IconButton>
  );
}


