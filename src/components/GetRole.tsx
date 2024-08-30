'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function GetRole() {
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchRole() {
      const getUser = Cookies.get('user');
      const userRole = getUser ? JSON.parse(getUser).role[0] : '';
      setRole(userRole);
    }

    fetchRole();
  }, []);

  return role;
}

export const token = Cookies.get('token');
