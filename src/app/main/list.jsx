import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloudIcon from '@mui/icons-material/Cloud';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FemaleIcon from '@mui/icons-material/Female';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import IcecreamIcon from '@mui/icons-material/Icecream';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ElectricBoltIcon />
      </ListItemIcon>
      <ListItemText primary="Link 1" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CloudIcon />
      </ListItemIcon>
      <ListItemText primary="Link 2" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FemaleIcon />
      </ListItemIcon>
      <ListItemText primary="Link 3" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <IcecreamIcon />
      </ListItemIcon>
      <ListItemText primary="Link 4" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FingerprintIcon />
      </ListItemIcon>
      <ListItemText primary="Link 5" />
    </ListItemButton>
  </React.Fragment>
);
