import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';

import FindByRef from './FindByRef';
import BookingTable from './BookingTable';
import DashboardPreview from './DashboardPreview';
import UnmatchedRecords from './UnmatchedRecords';
import CalendarView from './calendar/CalendarView';
import AdminCalendarView from './calendar-admin/CalendarView';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import WarningIcon from '@material-ui/icons/Warning';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';

export const MenuList = [
    {index: 0, id:`dashboard`, title: `Dashboard`, icon : <DashboardIcon/>, content: <DashboardPreview />},
    {index: 1, id:`recentBookings`, title: `Recent Bookings`, icon : <AutorenewIcon/>, content: <BookingTable date="recent"/>, hidden : false},
    {index: 2, id:`todayBookings`, title: `Today's Bookings`, icon : <NewReleasesIcon/>, content: <BookingTable date="today"/>},
    {index: 3, id:`liveBookings`, title: `Live Bookings`, icon : <LiveTvIcon/>, content: <BookingTable date="live"/>},
    {index: 4, id:`oldBookings`, title: `Old Bookings`, icon : <HistoryIcon/>, content: <BookingTable date="old"/>},
    {index: 5, id:`futureBookings`, title: `Future Bookings`, icon : <TimelineIcon/>, content: <BookingTable date="future"/>},
    {index: 6, id:`allBookings`, title: `All Bookings`, icon : <DescriptionIcon/>, content: <BookingTable date="all"/>},
    {index: 7, id:`completedBookings`, title: `Completed Bookings`, icon : <PlaylistAddCheckIcon/>, content: <BookingTable date="completed"/>},
    {index: 8, id:`positiveBookings`, title: `Positive Results`, icon : <AddCircleOutlineIcon/>, content: <BookingTable date="positive"/>},
    {index: 9, id:`latebookings`, title: `40 Hours Late`, icon : <HourglassEmptyIcon/>, content: <BookingTable date="late"/>},
    {index: 10, id:`deletedBookings`, title: `Deleted Records`, icon : <DeleteIcon/>, content: <BookingTable date="deleted"/>},
    {index: 11, id:`unmatchedRecords`, title: `Unmatched Records`, icon : <WarningIcon/>, content: <UnmatchedRecords/>},
    {index: 12, id:`calendarView`, title: `Calendar View`, icon : <DateRangeIcon/>, content: <CalendarView/>},
    {index: 13, id:`adminCalendarView`, title: `Admin Calendar`, icon : <EventNoteIcon/>, content: <AdminCalendarView/>},
    {index: 14, id:`findByRef`, title: `Find By Ref No`, icon : <SearchIcon/>, content: <FindByRef/>},
  ];

  export const getMenuContent = (index) =>
  {
      for (var i=0; i < MenuList.length; i++)
      {
          if (MenuList[i].index === index)
          {
              return MenuList[i].content;
          }
      }

      return (`Page Not Found!`); 
  }


  export const getMenuIndex = (id) =>
  {
      for (var i=0; i < MenuList.length; i++)
      {
          if (MenuList[i].id === id)
          {
              return MenuList[i].index;
          }
      }

      return -1;
  }




