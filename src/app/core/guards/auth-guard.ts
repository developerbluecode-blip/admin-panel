// import { CanActivateFn, Router } from '@angular/router';
// import { inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const platformId = inject(PLATFORM_ID);

//   if (isPlatformBrowser(platformId)) {
//     const token = localStorage.getItem('token');

//     if (token && token.length > 0) {
//       return true;
//     }
//   }

//   router.navigate(['/login']);
//   return false;
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🚨 SSR: allow navigation on server
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return true; // ✅ logged in
  }

  router.navigate(['/login']);
  return false;
};
