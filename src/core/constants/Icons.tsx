import React from "react";

export const icons =  { 
    search: React.lazy(()=>import ('../../assets/images/icons/search.svg?react')),
    check: React.lazy(()=>import ('../../assets/images/icons/check.svg?react')),
    close: React.lazy(()=>import ('../../assets/images/icons/close.svg?react')),
    copy: React.lazy(()=>import ('../../assets/images/icons/copy.svg?react')),
    thumbsUp: React.lazy(()=>import ('../../assets/images/icons/thumbs-up.svg?react')),
};