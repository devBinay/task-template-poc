import React from "react";

const pathInitial = "../../assets/images/icons";

export const icons = {
    arrowDown: React.lazy(() => import(pathInitial + '/arrow-down.svg?react')),
    calendarBlank: React.lazy(() => import(pathInitial + '/calendar-blank.svg?react')),
    calendar: React.lazy(() => import(pathInitial + '/calendar.svg?react')),
    check: React.lazy(() => import(pathInitial + '/check.svg?react')),
    checkedDoc: React.lazy(() => import(pathInitial + '/checked-doc.svg?react')),
    checkedList: React.lazy(() => import(pathInitial + '/checked-list.svg?react')),
    clipboardToDo: React.lazy(() => import(pathInitial + '/clipboard-to-do.svg?react')),
    close: React.lazy(() => import(pathInitial + '/close.svg?react')),
    comment: React.lazy(() => import(pathInitial + '/comment.svg?react')),
    communication: React.lazy(() => import(pathInitial + '/communication.svg?react')),
    copy: React.lazy(() => import(pathInitial + '/copy.svg?react')),
    delete: React.lazy(() => import(pathInitial + '/delete.svg?react')),
    edit: React.lazy(() => import(pathInitial + '/edit.svg?react')),
    employeeManagement: React.lazy(() => import(pathInitial + '/employee-management.svg?react')),
    envelope: React.lazy(() => import(pathInitial + '/envelope.svg?react')),
    exchange: React.lazy(() => import(pathInitial + '/exchange.svg?react')),
    foodSafety: React.lazy(() => import(pathInitial + '/food-safety.svg?react')),
    forecast: React.lazy(() => import(pathInitial + '/forecast.svg?react')),
    home: React.lazy(() => import(pathInitial + '/home.svg?react')),
    labourModel: React.lazy(() => import(pathInitial + '/labour-model.svg?react')),
    labourReport: React.lazy(() => import(pathInitial + '/labour-report.svg?react')),
    leadIcon: React.lazy(() => import(pathInitial + '/lead-icon.svg?react')),
    notification: React.lazy(() => import(pathInitial + '/notification.svg?react')),
    queueManagement: React.lazy(() => import(pathInitial + '/queue-management.svg?react')),
    quickLink: React.lazy(() => import(pathInitial + '/quick-link.svg?react')),
    scheduling: React.lazy(() => import(pathInitial + '/scheduling.svg?react')),
    search: React.lazy(() => import(pathInitial + '/search.svg?react')),
    send: React.lazy(() => import(pathInitial + '/send.svg?react')),
    staffing: React.lazy(() => import(pathInitial + '/staffing.svg?react')),
    standards: React.lazy(() => import(pathInitial + '/standards.svg?react')),
    storeOperations: React.lazy(() => import(pathInitial + '/store-operations.svg?react')),
    thumbsUp: React.lazy(() => import(pathInitial + '/thumbs-up.svg?react')),
    timeAndAttendance: React.lazy(() => import(pathInitial + '/time-and-attendance.svg?react'))
};
