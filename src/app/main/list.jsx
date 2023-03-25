import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillFolderOpen } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { FiHelpCircle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AiFillFolderOpen size={25} />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CgProfile size={25} />
      </ListItemIcon>
      <ListItemText primary="Profil" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FiHelpCircle size={25} />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FiSettings size={25} />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HiOutlineLogout size={25} />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
);
