import React from "react";

export const icons =  { 
    search: React.lazy(()=>import ('../../assets/images/icons/search.svg?react')),
    check: React.lazy(()=>import ('../../assets/images/icons/check.svg?react')),
    close: React.lazy(()=>import ('../../assets/images/icons/close.svg?react')),
    copy: React.lazy(()=>import ('../../assets/images/icons/copy.svg?react')),
    thumbsUp: React.lazy(()=>import ('../../assets/images/icons/thumbs-up.svg?react')),
    delete: React.lazy(()=>import ('../../assets/images/icons/delete.svg?react')),
    edit: React.lazy(()=>import ('../../assets/images/icons/edit.svg?react')),
    send: React.lazy(()=>import ('../../assets/images/icons/send.svg?react')),
    checkedList: React.lazy(()=>import ('../../assets/images/icons/checked-list.svg?react')),
    checkedDoc: React.lazy(()=>import ('../../assets/images/icons/checked-doc.svg?react')),
    arrowDown: React.lazy(()=>import ('../../assets/images/icons/arrow-down.svg?react')),
};