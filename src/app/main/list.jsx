import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillFolderOpen } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import WorkIcon from '@mui/icons-material/Work';
import { useUsers } from "../Components/userApi";



export const mainListItems = (
  <React.Fragment>
    <ListItemButton  href="/main">
      <ListItemIcon>
        <AiFillFolderOpen size={25} />
      </ListItemIcon>

      <ListItemText primary="Browse Postings"/>
    </ListItemButton>
    <ListItemButton onClick={handleApplications}>
      <ListItemIcon>
        <AiFillFolderOpen size={25} />
      </ListItemIcon>
      <ListItemText primary="Applications"/>

    </ListItemButton>
    <ListItemButton href="/profile">
      <ListItemIcon>
        <CgProfile size={25} />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton href="/jobposting">
      <ListItemIcon>
        <WorkIcon size={25} />
      </ListItemIcon>
      <ListItemText primary="Post a Job" />
    </ListItemButton>
    <ListItemButton href="/postreview" >
      <ListItemIcon>
        <AiFillFolderOpen size={25} />
      </ListItemIcon>
      <ListItemText primary="Post A Review"/>

    </ListItemButton>
    <ListItemButton href="/companies">
      <ListItemIcon>
        <WorkIcon size={25} />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItemButton>
    
    <ListItemButton onClick={handleSubmit}>
      <ListItemIcon>
        <HiOutlineLogout size={25} />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
);

async function handleSubmit(){
  const response = await fetch('/api/AppLogout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  });

  const json = await response.json();
  if (json.error) {
    console.log(json.error);
    setError(json.error);
  } else {
    window.location.href = '/logIn'
  }
};

async function handleApplications(){

    let result = await fetch("/api/UserType");
    let body = await result.json();

    if(body == "student"){
      window.location.href = '/applications'
    }else if(body == "employer"){
      window.location.href = '/applications2'
    }else{
      console.log(json.error);
    }
    
    
};


