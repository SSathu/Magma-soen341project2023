// userApi.js
import React from 'react';
import { useState } from 'react';

export async function getUsers() {
    let result = await fetch("/api/readUsers");
    let body = await result.json();
  
    return body;
  }
  
  export function useUsers() {
    const [users, setUsers] = React.useState(null);
  
    React.useEffect(() => {
      getUsers().then(data => {
        setUsers(data);
      });
    }, []);
  
    return users;
  }
  